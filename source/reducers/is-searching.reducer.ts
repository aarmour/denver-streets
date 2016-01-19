import { SEARCH } from '../actions/search.actions';

export default function isSearching(state = false, action) {
  if (action.type === SEARCH) {
    return !(action.response || action.error);
  }

  return state;
}
