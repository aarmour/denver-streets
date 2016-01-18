import { provide } from 'angular2/core';
const mapboxgl = require('mapbox-gl');

function mapService() {
  return window['L'];
}

function mapServiceGL() {
  return mapboxgl;
}

export const MAP_SERVICE_PROVIDERS = [
  provide('MapService', { useFactory: mapService }),
  provide('MapServiceGL', { useFactory: mapServiceGL })
];
