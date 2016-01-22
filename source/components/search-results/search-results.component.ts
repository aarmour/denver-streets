import { Component, Output, EventEmitter } from 'angular2/core';
import SearchResult from './search-result.component';

@Component({
  selector: 'search-results',
  inputs: ['items'],
  directives: [SearchResult],
  template: `
    <style>
      .search-results ul {
        list-style: none;
        padding: 0;
        overflow-y: scroll;
      }
      .search-results ul li {
        border-top: solid 1px #ccc;
      }
    </style>

    <div class="search-results">
      <h3 *ngIf="!hasItems">No results</h3>
      <div *ngIf="hasItems">
        <ul>
          <li *ngFor="#item of items">
            <search-result [item]="item" (click)="handleClickResult(item)"></search-result>
          </li>
        </ul>
      </div>
    </div>
  `
})
export default class SearchResults {

  @Output() select = new EventEmitter();

  private items = [];

  get hasItems() {
    return this.items.length;
  }

  handleClickResult(result) {
    this.select.next(result);
  }

}
