import { Component, Inject, OnDestroy, provide } from 'angular2/core';
import { Router } from 'angular2/router';
import { Http } from 'angular2/http';
import { bindActionCreators } from 'redux';
import SearchBar from '../components/search-bar.component';
const MenuControl = require('../mapbox-plugins/gl/control/menu');
import { AppConfig } from '../services/app-config.service';
import GeocodeService from '../services/geocode.service';
import * as SearchActions from '../actions/search.actions';
import { encodePathPart as encodeUriPathPart } from '../utilities/uri';
import { isEmpty as isObjectEmpty } from '../utilities/object';
import { getBoundingBoxFromFeatures } from '../utilities/geojson';

const ELEMENT_ID = 'map';
const MAP_CENTER = [-104.9, 39.7];
const MAP_BOUNDS = [[-105.1, 39.6], [-104.7, 39.8]];
const MAP_PITCH = 60;

function createGeocodeService(appConfig, http: Http) {
  return new GeocodeService({
    accessToken: appConfig.mapbox.accessToken,
    proximity: MAP_CENTER
  }, http);
}

@Component({
  selector: 'map',
  directives: [
    SearchBar
  ],
  providers: [
    provide(GeocodeService, { useFactory: createGeocodeService, deps: [AppConfig, Http] })
  ],
  template: `
    <style>
      .map {
        width: 100%;
        height: 100%;
      }

      .search-control {
        position: absolute;
        top: 10px;
        left: 50%;
        z-index: 1;

      }

      @media (min-width: 480px) {
        .search-control {
          width: 380px;
          margin: 0 0 0 -190px;
        }
      }

      @media (min-width: 768px) {
        .search-control {
          width: 500px;
          margin: 0 0 0 -250px;
        }
      }
    </style>
    <div class="search-control">
      <search-bar
        (search)="handleSearch($event)"
        placeholder="Enter an address or place name"
        lastQuery="{{query.previous}}"
        [disabled]="isSearching">
      </search-bar>
    </div>
    <div id="${ELEMENT_ID}" class="map"></div>
  `
})
export default class Map implements OnDestroy {

  private map: any;
  private searchResults: Array<Object>;
  private selectedSearchResult: Object;
  protected unsubscribe: Function;
  protected search: Function;

  constructor(
    @Inject('ngRedux') private ngRedux,
    private router: Router,
    @Inject('MapServiceGL') private mapService: any,
    private geocodeService: GeocodeService,
    @Inject(AppConfig) appConfig) {

    const unsubscribeFns = [];

    unsubscribeFns.push(ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this));
    unsubscribeFns.push(ngRedux.subscribe(this.handleStoreChange.bind(this)));

    this.unsubscribe = () => unsubscribeFns.forEach(fn => fn());

    this.mapService.accessToken = appConfig.mapbox.accessToken;
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

  ngOnInit() {
    const { Map, GeoJSONSource, Navigation } = this.mapService;

    // TODO: fix. This is a hack to get the map to draw correctly.
    setTimeout(() => {
      const map = this.map = new Map({
        container: ELEMENT_ID,
        style: 'mapbox://styles/mapbox/basic-v8',
        center: MAP_CENTER,
        maxBounds: MAP_BOUNDS,
        zoom: 10
      });

      map.addControl(new Navigation());
      map.addControl(new MenuControl());
    }, 0);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  handleSearch(query: string) {
    this.search(query, this.geocodeService);
    this.router.navigate(['Search', { query: encodeUriPathPart(query) }]);
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

  mapStateToThis(state) {
    return {
      location: state.location,
      query: state.query,
      isSearching: state.isSearching
    };
  }

  mapDispatchToThis(dispatch) {
    return bindActionCreators(SearchActions, dispatch);
  }
}
