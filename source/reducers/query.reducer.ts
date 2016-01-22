import { SEARCH } from '../actions/search.actions';

function formatQuery(query: string[]) {
  return query.join(' ').toUpperCase();
}

export default function query(state = { previous: undefined, current: undefined }, action) {
  if (action.type === SEARCH && action.response) {
    const previous = state.current;
    const current = formatQuery(action.response.query);

    return { previous, current };
  }

  return state;
}
