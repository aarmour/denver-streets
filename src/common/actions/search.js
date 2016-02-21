import { CALL_API } from '../middleware/api';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

function fetchSearchResults(query, types, endpoint) {
  return {
    query,
    [CALL_API]: {
      types,
      endpoint
    }
  };
}

export function loadSearchResults(query, pageUrl) {
  return (dispatch, getState) => {
    const pagination = getState().pagination.searchResults[query];

    if (pagination && pagination[pageUrl]) {
      return dispatch({
        type: SEARCH_SUCCESS,
        query,
        response: pagination[pageUrl]
      });
    }

    if (!pageUrl) {
      pageUrl = `/search/q/${query}`;
    }

    const types = [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE];

    dispatch(fetchSearchResults(query, types, pageUrl));
  };
}

export const YELP_SEARCH_REQUEST = 'YELP_SEARCH_REQUEST';
export const YELP_SEARCH_SUCCESS = 'YELP_SEARCH_SUCCESS';
export const YELP_SEARCH_FAILURE = 'YELP_SEARCH_FAILURE';

export function loadYelpSearchResults(query, pageUrl) {
  return (dispatch, getState) => {
    const pagination = getState().pagination.yelpSearchResults[query];

    if (pagination && pagination[pageUrl]) {
      return dispatch({
        type: YELP_SEARCH_SUCCESS,
        query,
        response: pagination[pageUrl]
      });
    }

    if (!pageUrl) {
      pageUrl = `/yelp/search/q/${query}`;
    }

    const types = [YELP_SEARCH_REQUEST, YELP_SEARCH_SUCCESS, YELP_SEARCH_FAILURE];

    dispatch(fetchSearchResults(query, types, pageUrl));
  };
}
