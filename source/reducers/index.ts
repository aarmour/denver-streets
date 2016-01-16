const combineReducers = require('redux').combineReducers;
import location from './location.reducer';

export const rootReducer = combineReducers({
  location
});
