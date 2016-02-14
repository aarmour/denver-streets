import { SEARCH_SUCCESS } from '../actions/search';

export default function searchResults(state = { total: 0, results: [] }, action) {
  if (action.type === SEARCH_SUCCESS) {
    return Object.assign({}, action.response);
  }

  return state;
}
