// Polyfills
import 'es6-shim';
import 'es6-promise';
import 'zone.js/lib/browser/zone-microtask';

if (process.env.ENV !== 'production') {
  require('reflect-metadata');

  // Enable zone.js long stack traces
  Error['stackTraceLimit'] = Infinity;
  Zone['longStackTraceZone'] = require('zone.js/lib/zones/long-stack-trace.js');
}

// Vendor
import 'angular2/platform/browser';
import 'angular2/platform/common_dom';
import 'angular2/router';
import 'angular2/http';
import 'angular2/core';
import 'rxjs';

// Cannot use ES6 module syntax for non-typescript modules.
// See http://stackoverflow.com/a/34569845
require('mapbox.js');
const { createStore, applyMiddleware } = require('redux');
const { provider } = require('ng2-redux');
const thunk = require('redux-thunk');

import { bootstrap } from 'angular2/platform/browser';
import { rootReducer } from './reducers';
import App from './containers/app-container.component';
import { MAP_SERVICE_PROVIDERS } from './services/map.service';

// Bootstrap
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

bootstrap(App, [provider(store), MAP_SERVICE_PROVIDERS]);
