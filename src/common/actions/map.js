export const CENTER_MAP = 'CENTER_MAP';

export function centerMap(coordinates, zoom = 16) {
  return {
    type: CENTER_MAP,
    coordinates,
    zoom
  };
}
