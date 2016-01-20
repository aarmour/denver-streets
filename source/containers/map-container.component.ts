import { Component, Inject, OnDestroy, provide } from 'angular2/core';
import { Http } from 'angular2/http';
import { bindActionCreators } from 'redux';
import SearchBar from '../components/search-bar.component';
const MenuControl = require('../mapbox-plugins/gl/control/menu');
import { AppConfig } from '../services/app-config.service';
import GeocodeService from '../services/geocode.service';
import * as SearchActions from '../actions/search.actions';

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
        placeholder="Enter an address"
        lastQuery="{{lastQuery}}"
        [disabled]="isSearching">
      </search-bar>
    </div>
    <div id="${ELEMENT_ID}" class="map"></div>
  `
})
export default class Map implements OnDestroy {

  private map: any;
  protected unsubscribe: Function;
  protected search: Function;

  constructor(
    @Inject('ngRedux') ngRedux,
    @Inject('MapServiceGL') private mapService: any,
    private geocodeService: GeocodeService,
    @Inject(AppConfig) appConfig) {

    this.unsubscribe = ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
    this.mapService.accessToken = appConfig.mapbox.accessToken;
  }

  ngOnInit() {
    const mapService = this.mapService;

    // TODO: fix. This is a hack to get the map to draw correctly.
    setTimeout(() => {
      const map = this.map = new mapService.Map({
        container: ELEMENT_ID,
        style: 'mapbox://styles/mapbox/basic-v8',
        center: MAP_CENTER,
        maxBounds: MAP_BOUNDS,
        zoom: 10
      });

      map.addControl(new mapService.Navigation());
      map.addControl(new MenuControl());
    }, 0);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  handleSearch(query: string) {
    this.search(query, this.geocodeService);
  }

  mapStateToThis(state) {
    return {
      location: state.location,
      lastQuery: state.lastQuery,
      isSearching: state.isSearching
    };
  }

  mapDispatchToThis(dispatch) {
    return bindActionCreators(SearchActions, dispatch);
  }
}
