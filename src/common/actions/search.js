import { CALL_API } from '../middleware/api';

export const SEARCH_REQUEST = 'SEARCH_RESULT';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

function fetchSearchResults(query) {
  return {
    [CALL_API]: {
      types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE],
      endpoint: `/search/q/${query}`
    }
  };
}

export function loadSearchResults(query) {
  return dispatch => dispatch(fetchSearchResults(query));
}
