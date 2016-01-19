import { combineReducers } from 'redux';
import lastQuery from './last-query.reducer';
import location from './location.reducer';

export const rootReducer = combineReducers({
  lastQuery,
  location
});
