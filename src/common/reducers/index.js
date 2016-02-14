import { combineReducers } from 'redux';
import entities from './entities';
import searchResults from './searchResults';

const rootReducer = combineReducers({
  entities,
  searchResults
});

export default rootReducer;
