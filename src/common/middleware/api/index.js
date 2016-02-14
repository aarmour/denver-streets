import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import 'isomorphic-fetch';

export { default as Schemas } from './schemas';

const API_ROOT = '/api';

/**
 * Fetches an API response and normalizes the result JSON according to schema.
 * This makes every API response have the same shape, regardless of how nested it was.
 */
function callApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);

      if (schema) {
        return Object.assign({}, normalize(camelizedJson, schema));
      } else {
        return camelizedJson;
      }
    });
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { schema, types } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);

    finalAction[CALL_API] = undefined;

    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;

  next(actionWith({ type: requestType }));

  return callApi(endpoint, schema)
    .then(response => next(actionWith({
      response,
      type: successType
    })))
    .catch(error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    })));
};
