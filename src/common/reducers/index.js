import { combineReducers } from 'redux';
import * as SearchActionTypes from '../actions/search';
import entities from './entities';
import paginate from './paginate';
import map from './map';

const pagination = combineReducers({

  searchResults: paginate({
    mapActionToKey: action => action.query,
    types: [
      SearchActionTypes.SEARCH_REQUEST,
      SearchActionTypes.SEARCH_SUCCESS,
      SearchActionTypes.SEARCH_FAILURE
    ]
  }),

  yelpSearchResults: paginate({
    mapActionToKey: action => action.query,
    types: [
      SearchActionTypes.YELP_SEARCH_REQUEST,
      SearchActionTypes.YELP_SEARCH_SUCCESS,
      SearchActionTypes.YELP_SEARCH_FAILURE
    ]
  })

});

const rootReducer = combineReducers({
  entities,
  pagination,
  map
});

export default rootReducer;
