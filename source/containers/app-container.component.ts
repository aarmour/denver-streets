import { Component, Inject } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import SearchBarContainer from './search-bar-container.component';
import MapContainer from './map-container.component';
import SearchResultsPanel from './search-results-panel-container.component';

@Component({
  selector: 'app-container',
  directives: [
    SearchBarContainer,
    MapContainer,
    ROUTER_DIRECTIVES
  ],
  template: `
    <router-outlet></router-outlet>
    <search-bar-container></search-bar-container>
    <map-container></map-container>
  `
})
@RouteConfig([
  { path: '/search/q/:query', name: 'Search', component: SearchResultsPanel }
])
export default class AppContainer {

  protected unsubscribe: Function;

  constructor(@Inject('ngRedux') ngRedux) {
    this.unsubscribe = ngRedux.connect(this.mapStateToThis)(this);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return {};
  }

}
