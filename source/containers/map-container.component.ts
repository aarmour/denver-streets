import { Component, Inject, OnInit, OnDestroy, provide } from 'angular2/core';
import { Router } from 'angular2/router';
import { bindActionCreators } from 'redux';
const MenuControl = require('../mapbox-plugins/gl/control/menu');
import { isEmpty as isObjectEmpty } from '../utilities/object';
import { AppConfig } from '../services/app-config.service';
import { getBoundingBoxFromFeatures } from '../utilities/geojson';

const ELEMENT_ID = 'map';
const MAP_CENTER = [-104.9, 39.7];
const MAP_BOUNDS = [[-105.1, 39.6], [-104.7, 39.8]];
const MAP_PITCH = 60;

@Component({
  selector: 'map-container',
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
export default class MapContainer implements OnInit, OnDestroy {

  private map: any;
  private searchResults: Array<Object>;
  private selectedSearchResult: Object;
  protected unsubscribe: Function;

  constructor(
    @Inject('ngRedux') private ngRedux,
    private router: Router,
    @Inject('MapServiceGL') private mapService: any,
    @Inject(AppConfig) appConfig) {

    const unsubscribeFns = [];

    unsubscribeFns.push(ngRedux.connect(this.mapStateToThis)(this));
    unsubscribeFns.push(ngRedux.subscribe(this.handleStoreChange.bind(this)));

    this.unsubscribe = () => unsubscribeFns.forEach(fn => fn());

    this.mapService.accessToken = appConfig.mapbox.accessToken;
  }

  mapStateToThis(state) {
    return {
      location: state.location,
      query: state.query,
      isSearching: state.isSearching
    };
  }

  ngOnInit() {
    const { Map, GeoJSONSource, Navigation } = this.mapService;

    const map = this.map = new Map({
      container: ELEMENT_ID,
      style: 'mapbox://styles/mapbox/basic-v8',
      center: MAP_CENTER,
      maxBounds: MAP_BOUNDS,
      zoom: 10
    });

    map.addControl(new Navigation());
    map.addControl(new MenuControl());
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  setMapCenter(point) {
    this.map.easeTo({ center: point, zoom: 15 });
  }

  setMapBounds(boundingBox) {
    this.map.fitBounds(boundingBox, { padding: 35 });
  }

  setSearchResultsData(searchResults) {
    const map = this.map;
    const data = { type: 'FeatureCollection', features: searchResults };

    // Lazily create the layer if it doesn't exist
    if (!map.getLayer('search results')) {
      const { GeoJSONSource } = this.mapService;
      const searchResultsGeoSource = new GeoJSONSource({ data });

      map.addSource('search results', searchResultsGeoSource);

      map.addLayer({
        id: 'search results',
        type: 'symbol',
        source: 'search results',
        layout: {
          'icon-image': '{maki}-18',
          'text-field': '{address}',
          'text-font': ['Roboto Regular', 'Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 1],
          'text-anchor': 'top',
          'text-size': 12
        }
      });
    } else {
      map.getSource('search results').setData(data);
    }
  }

  handleStoreChange() {
    const state = this.ngRedux.getState();

    const searchResults = state.searchResults;
    const searchResultsChanged = (searchResults !== this.searchResults);

    if (searchResultsChanged) {
      this.searchResults = searchResults;
      this.setSearchResultsData(searchResults);
    }

    const selectedSearchResult = state.selectedSearchResult;
    const selectedSearchResultChanged =
      ((selectedSearchResult !== this.selectedSearchResult) && !isObjectEmpty(selectedSearchResult));

    // If a search result has been selected, pan and zoom the map
    // to the location of the selected result. Otherwise, if there
    // are search results, set the map to the bounds of the results.
    if (selectedSearchResultChanged) {
      this.selectedSearchResult = selectedSearchResult;

      const center = selectedSearchResult.center;

      if (center) {
        this.setMapCenter(center);
      }
    } else if (searchResultsChanged && searchResults.length) {
      this.setMapBounds(getBoundingBoxFromFeatures(searchResults));
    }
  }

}
