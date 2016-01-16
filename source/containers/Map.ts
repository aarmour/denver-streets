import { Component, Inject, ElementRef } from 'angular2/core';

const ELEMENT_ID = 'map';
const MAP_CENTER = [-104.9, 39.7];
const MAP_BOUNDS = [[-105.1, 39.6], [-104.7, 39.8]];

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
    @Inject('MapServiceGL') private _mapService: any) {

    this.unsubscribe = ngRedux.connect()(this);
    this._mapService.accessToken = 'pk.eyJ1IjoiYWFybW91ciIsImEiOiJjaWlucjJxNDkwMWVwdmptNWw4Z20xNXpwIn0.SwlGS26RAgqeTK1kD-Xclw';
  }

  unsubscribe() {}

  ngOnInit() {
    const mapService = this._mapService;

    // TODO: fix. This is a hack to get the map to draw correctly.
    setTimeout(() => {
      const map = this._map = new mapService.Map({
        container: ELEMENT_ID,
        style: 'mapbox://styles/mapbox/basic-v8',
        center: MAP_CENTER,
        maxBounds: MAP_BOUNDS,
        zoom: 10
      });

      map.addControl(new mapService.Navigation());
    }, 0);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  getStyles() {

  }
}
