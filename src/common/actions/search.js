import { CALL_API } from '../middleware/api';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

function fetchSearchResults(query, endpoint) {
  return {
    query,
    [CALL_API]: {
      types: [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE],
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

    dispatch(fetchSearchResults(query, pageUrl));
  };
}
