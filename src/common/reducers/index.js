import { combineReducers } from 'redux';
import * as SearchActionTypes from '../actions/search';
import entities from './entities';
import paginate from './paginate';
import searchResults from './searchResults';

const pagination = combineReducers({
  searchResults: paginate({
    mapActionToKey: action => action.query,
    types: [
      SearchActionTypes.SEARCH_REQUEST,
      SearchActionTypes.SEARCH_SUCCESS,
      SearchActionTypes.SEARCH_FAILURE
    ]
  })
});

const rootReducer = combineReducers({
  entities,
  pagination,
  // searchResults
});

export default rootReducer;
