export const SEARCH = 'SEARCH';

export function requestSearch(query) {
  return {
    type: SEARCH,
    query
  };
}

export function receiveSearch(query, json) {
  return {
    type: SEARCH,
    query,
    response: json
  };
}

export function failSearch(query, error) {
  return {
    type: SEARCH,
    query,
    error
  };
}

export function search(query, geocodeService) {
  return dispatch => {
    dispatch(requestSearch(query));

    geocodeService.forwardGeocode(query)
      .subscribe(
        json => dispatch(receiveSearch(query, json)),
        error => dispatch(failSearch(query, error))
      );
  };
}
