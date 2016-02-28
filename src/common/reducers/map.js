import { combineReducers } from 'redux';
import uniqueBy from 'lodash.uniqby';
import { CENTER_MAP } from '../actions/map';
import { SEARCH_SUCCESS, YELP_SEARCH_SUCCESS } from '../actions/search';

const DEFAULT_MAP_CENTER = [-104.9848, 39.7392];
const DEFAULT_MAP_ZOOM = 12;

function center(state = DEFAULT_MAP_CENTER, action) {
  if (action.type === CENTER_MAP) {
    return action.coordinates;
  }

  return state;
}

function zoom(state = DEFAULT_MAP_ZOOM, action) {
  if (action.type === CENTER_MAP) {
    return action.zoom;
  }

  return state;
}

function pois(state = {}, action) {

  if (action.type === SEARCH_SUCCESS) {
    const { query } = action;
    const features = (state[query] || {}).features || [];
    const { results } = action.response;
    const newFeatures =
      uniqueBy(features.concat(results.map(resultToGeoJSON)), 'properties.slug');

    return { [query]: Object.assign({ type: 'FeatureCollection' }, { features: newFeatures }) };
  }

  if (action.type === YELP_SEARCH_SUCCESS) {
    const { query } = action;
    const features = (state[query] || {}).features || [];
    const { businesses } = action.response;
    const newFeatures =
      uniqueBy(features.concat(businesses.map(businessToGeoJSON)), 'properties.slug');

    return { [query]: Object.assign({ type: 'FeatureCollection' }, { features: newFeatures }) };
  }

  return state;
}

function resultToGeoJSON(result) {
  const { geometry } = result;

  return {
    type: 'Feature',
    geometry,
    properties: {
      slug: result.slug,
      'marker-symbol': 'marker-24'
    }
  };
}

function businessToGeoJSON(business) {
  const { coordinate } = business.location;

  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [coordinate.longitude, coordinate.latitude]
    },
    properties: {
      slug: business.id,
      'marker-symbol': 'marker-24'
    }
  };
}

export default combineReducers({
  center,
  zoom,
  pois
});
