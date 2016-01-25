import { Component, Inject } from 'angular2/core';
import { bindActionCreators } from 'redux';
import SidePanel from '../components/side-panel/side-panel.component';
import { SearchResults } from '../components/search-results';
import * as SearchActions from '../actions/search.actions';

@Component({
  selector: 'search-results-panel',
  directives: [
    SidePanel,
    SearchResults
  ],
  template: `
    <side-panel isOpen="true">
      <h3 *ngIf="isSearching">Loading...</h3>
      <div *ngIf="!isSearching">
        <search-results
          [items]="searchResults"
          (select)="handleSelectSearchResult($event)"
        ></search-results>
      </div>
    </side-panel>
  `
})
export default class SearchResultsPanelContainer {

  protected unsubscribe: Function;
  protected selectSearchResult: Function;

  constructor(@Inject('ngRedux') ngRedux) {
    this.unsubscribe = ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  handleSelectSearchResult(result) {
    this.selectSearchResult(result);
  }

  mapStateToThis(state) {
    return {
      isSearching: state.isSearching,
      hasResults: state.searchResults.length,
      searchResults: state.searchResults
    };
  }

  mapDispatchToThis(dispatch) {
    return bindActionCreators(SearchActions, dispatch);
  }

}
