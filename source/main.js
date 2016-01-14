import 'reflect-metadata';
import 'es6-shim';

import { bootstrap } from 'angular2/platform/browser';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './containers/App';
import { provider } from  'ng2-redux';
import { rootReducer } from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);

bootstrap(App, [provider(store)]);
