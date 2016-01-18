import { bootstrap } from 'angular2/platform/browser';
import { provide } from 'angular2/core';
const { provider } = require('ng2-redux');
import { AppConfig, loadFromGlobal } from './services/app-config.service';
import App from './containers/app-container.component';
import configureStore from './store/configure-store';

// Providers
import { HTTP_PROVIDERS } from 'angular2/http';
import { MAP_SERVICE_PROVIDERS } from './services/map.service';

if (process.env.ENV !== 'production') {
  // Enable zone.js long stack traces
  Error['stackTraceLimit'] = Infinity;
  window['zone']['longStackTraceZone'] = require('zone.js/lib/zones/long-stack-trace.js');
}

// Bootstrap
const store = configureStore();

bootstrap(App, [
  HTTP_PROVIDERS,
  provide(AppConfig, { useValue: loadFromGlobal('Config') }),
  provider(store),
  MAP_SERVICE_PROVIDERS
]);
