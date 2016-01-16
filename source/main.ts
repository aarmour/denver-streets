import 'reflect-metadata';
import 'es6-shim';

// Cannot use ES6 module syntax for non-typescript modules.
// See http://stackoverflow.com/a/34569845
require('mapbox.js');
const { createStore, applyMiddleware } = require('redux');
const { provider } = require('ng2-redux');
const thunk = require('redux-thunk');

import { bootstrap } from 'angular2/platform/browser';
import { rootReducer } from './reducers';
import App from './containers/App';
import { MAP_SERVICE_PROVIDERS } from './services/MapService';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

bootstrap(App, [provider(store), MAP_SERVICE_PROVIDERS]);
