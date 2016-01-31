import { bootstrap } from 'angular2/platform/browser';
import { provide } from 'angular2/core';
import { Http } from 'angular2/http';
const { provider } = require('ng2-redux');
import configureStore from './store/configure-store';
import { AppConfig, loadFromGlobal } from './services/app-config.service';
import GeocodeService from './services/geocode.service';
import AppContainer from './containers/app-container.component';

// Providers
import { ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import { MAP_SERVICE_PROVIDERS } from './services/map.service';

if (process.env.ENV !== 'production') {
  // Enable zone.js long stack traces
  Error['stackTraceLimit'] = Infinity;
  window['zone']['longStackTraceZone'] = require('zone.js/lib/zones/long-stack-trace.js');
}

function createGeocodeService(appConfig, http: Http) {
  return new GeocodeService({
    accessToken: appConfig.mapbox.accessToken,
    proximity: [-104.9, 39.7]
  }, http);
}

// Bootstrap
const store = configureStore();

bootstrap(AppContainer, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  provider(store),
  provide(AppConfig, { useValue: loadFromGlobal('Config') }),
  provide(GeocodeService, { useFactory: createGeocodeService, deps: [AppConfig, Http] }),
  MAP_SERVICE_PROVIDERS
]);
