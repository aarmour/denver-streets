import { Component, Inject } from 'angular2/core';
import { Router } from 'angular2/router';
import { bindActionCreators } from 'redux';
import { encodePathPart as encodeUriPathPart } from '../utilities/uri';
import * as SearchActions from '../actions/search.actions';
import GeocodeService from '../services/geocode.service';
import SearchBar from '../components/search-bar/search-bar.component';

@Component({
  selector: 'search-bar-container',
  directives: [SearchBar],
  template: `
    <style>
      .search-control {
        position: absolute;
        top: 6px;
        left: 6px;
        width: 340px;
        border: solid 1px #ddd;
        z-index: 1;
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
  `
})
export default class SearchBarContainer {

  protected unsubscribe: Function;
  protected search: Function;

  constructor(
    private router: Router,
    @Inject('ngRedux') private ngRedux,
    private geocodeService: GeocodeService
  ) {
    this.unsubscribe = ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
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

  handleSearch(query: string) {
    this.search(query, this.geocodeService);
    this.router.navigate(['Search', { query: encodeUriPathPart(query) }]);
  }

}
