import { Component, Inject, ElementRef } from 'angular2/core';

const ELEMENT_ID = 'map';
const MAP_CENTER = [39.7, -104.9];
const MAP_BOUNDS = [[39.6, -105.1], [39.8, -104.7]];

@Component({
  selector: 'map',
  template: `
    <style>
      .map {
        width: 100%;
        height: 100%;
      }
    </style>
    <div id="${ELEMENT_ID}" class="map"></div>
  `
})
export default class Map {
  private _map: any;

  constructor(
    @Inject('ngRedux') ngRedux,
    @Inject('MapService') private _mapService: any) {

    this.unsubscribe = ngRedux.connect()(this);
    this.init();
  }

  init() {
    const mapService = this._mapService;

    // TODO: inject token
    mapService.mapbox.accessToken = 'pk.eyJ1IjoiYWFybW91ciIsImEiOiJjaWlucjJxNDkwMWVwdmptNWw4Z20xNXpwIn0.SwlGS26RAgqeTK1kD-Xclw';
  }

  unsubscribe() {}

  ngOnInit() {
    const mapService = this._mapService;

    this._map = mapService.mapbox.map(ELEMENT_ID, 'mapbox.streets', {
      center: MAP_CENTER,
      maxBounds: MAP_BOUNDS
    });

    // TODO: fix. This is a hack to get the map to draw correctly.
    setTimeout(() => this._map.fitBounds(MAP_BOUNDS), 0);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  getStyles() {

  }
}
