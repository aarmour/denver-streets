import { CENTER_MAP } from '../actions/map.actions';

const INITIAL_MAP_CENTER = [-104.9, 39.7];

export default function mapCenter(state = INITIAL_MAP_CENTER, action) {
  if (action.type === CENTER_MAP) {
    return action.point;
  }

  return state;
}
