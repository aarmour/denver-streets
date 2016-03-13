import { CALL_API } from '../middleware/api';

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

function fetchSearchResults(query, provider, types, endpoint) {
  return {
    query,
    provider,
    [CALL_API]: {
      types,
      endpoint
    }
  };
}

export function loadSearchResults(query, provider = 'default', pageUrl) {
  return (dispatch, getState) => {
    const pagination = getState().pagination.searchResults[provider];

    if (pagination && pagination[pageUrl]) {
      return dispatch({
        type: SEARCH_SUCCESS,
        query,
        provider,
        response: pagination[pageUrl]
      });
    }

    if (!pageUrl) {
      const providerPrefix = provider === 'default' ? '' : `/${provider}`;

      pageUrl = `${providerPrefix}/search/q/${query}`;
    }

    const types = [SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE];

    dispatch(fetchSearchResults(query, provider, types, pageUrl));
  };
}
