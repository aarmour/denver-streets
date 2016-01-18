import { createStore, applyMiddleware } from 'redux';
const thunk = require('redux-thunk');
import { rootReducer } from '../reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default function () {
  return createStoreWithMiddleware(rootReducer);
}
