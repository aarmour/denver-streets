import { combineReducers } from 'redux';
import isSearching from './is-searching.reducer';
import lastQuery from './last-query.reducer';
import location from './location.reducer';

export const rootReducer = combineReducers({
  isSearching,
  lastQuery,
  location
});
