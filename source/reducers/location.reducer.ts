import { SEARCH } from '../actions/search.actions';

export default function location(state = { current: {} }, action) {
  if (action.type === SEARCH) {
    if (action.response && action.response.features) {
      const location = action.response.features[0];

      return Object.assign({}, state, { current: location });
    }
  }

  return state;
}
