import { SEARCH } from '../actions/search.actions';

function formatQuery(query: string[]) {
  return query.join(' ').toUpperCase();
}

export default function lastQuery(state = '', action) {
  if (action.type === SEARCH && action.response) {
    return formatQuery(action.response.query);
  }

  return state;
}
