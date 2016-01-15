import 'reflect-metadata';
import 'es6-shim';

import { bootstrap } from 'angular2/platform/browser';
import App from './containers/App';
import { rootReducer } from './reducers';
// Cannot use ES6 module syntax for non-typescript modules.
// See http://stackoverflow.com/a/34569845
const { createStore, applyMiddleware } = require('redux');
const { provider } = require('ng2-redux');
const thunk = require('redux-thunk');

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

bootstrap(App, [provider(store)]);
