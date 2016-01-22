import { SELECT_SEARCH_RESULT } from '../actions/search.actions';

export default function selectedSearchResult(state = {}, action) {
  if (action.type === SELECT_SEARCH_RESULT) {
    return action.searchResult;
  }

  return state;
}
