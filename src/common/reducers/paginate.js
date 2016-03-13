import merge from 'lodash.merge';

/**
 * Creates a reducer for managing pagination, given the action types to handle,
 * and a function for extracting the key from an action.
 */
export default function paginate({ types, mapActionToKey }) {
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected types to be an array of three elements.');
  }

  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }

  if (typeof mapActionToKey !== 'function') {
    throw new Error('Expected mapActionToKey to be a function.');
  }

  const [requestType, successType, failureType] = types;

  function updatePagination(state = {
    isFetching: false,
    nextPageUrl: undefined,
    prevPageUrl: undefined,
    selectedPage: undefined
  }, action) {
    switch (action.type) {
      case requestType:
        return merge({}, state, { isFetching: true });
      case successType:
        const { links } = action.response || {};

        return merge({}, state, {
          isFetching: false,
          nextPageUrl: links.next || null,
          prevPageUrl: links.prev || null,
          selectedPage: links.self || null,
          [links.self]: action.response
        });
      case failureType:
        return merge({}, state, { isFetching: false });
      default:
        return state;
    }
  }

  return function updatePaginationByKey(state = {}, action) {
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        const key = mapActionToKey(action);

        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.');
        }

        return merge({}, state, {
          [key]: updatePagination(state[key], action)
        });
      default:
        return state;
    }
  };
}
