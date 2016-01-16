import { provide } from 'angular2/core';

function mapService() {
  return window['L'];
}

export const MAP_SERVICE_PROVIDERS = [
  provide('MapService', { useFactory: mapService })
];
