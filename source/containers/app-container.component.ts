import { Component, Inject } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import Map from './map-container.component';
import SearchResultsPanelContainer from './search-results-panel-container.component';

@Component({
  selector: 'app',
  directives: [
    Map,
    ROUTER_DIRECTIVES
  ],
  template: `
    <router-outlet></router-outlet>
    <map></map>
  `
})
@RouteConfig([
  { path: '/search/q/:query', name: 'Search', component: SearchResultsPanelContainer }
])
export default class AppContainer {

  protected unsubscribe: Function;

  constructor(@Inject('ngRedux') ngRedux) {
    this.unsubscribe = ngRedux.connect(this.mapStateToThis/*, this.mapDispatchToThis */)(this);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    // TODO: bind state properties to 'this'
    return {
      // someProp: state.someProp
    };
  }

  mapDispatchToThis(dispatch) {
    // TODO (optional): bind action creators to 'this'
    // return { actions: bindActionCreators(SomeActions, dispatch) };
  }

}
