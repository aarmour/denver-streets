import { combineReducers } from 'redux';
import isSearching from './is-searching.reducer';
import query from './query.reducer';
import location from './location.reducer';
import mapCenter from './map-center.reducer';
import searchResults from './search-results.reducer';
import selectedSearchResult from './selected-search-result.reducer';

export const rootReducer = combineReducers({
  query,
  isSearching,
  location,
  mapCenter,
  searchResults,
  selectedSearchResult
});
