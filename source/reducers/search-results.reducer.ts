import { SEARCH } from '../actions/search.actions';
import { containsPoint } from '../utilities/bounding-box';

const MAP_BOUNDS = [[-105.1, 39.6], [-104.7, 39.8]];

function filterFeaturesByGeometry(features) {
  return features.filter(f => containsPoint(MAP_BOUNDS, f.geometry.coordinates));
}

export default function searchResults(state = [], action) {
  if (action.type === SEARCH && action.response) {
    return filterFeaturesByGeometry(action.response.features);
  }

  return state;
}
