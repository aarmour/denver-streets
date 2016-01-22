import { Component, Output, EventEmitter } from 'angular2/core';

@Component({
  selector: 'search-result',
  inputs: ['item'],
  template: `
    <style>
      .search-result > a {
        display: block;
        padding: 18px 11px;
        font-size: 0.8em;
      }
      .search-result > a:hover,
      .search-result > a:active,
      .search-result > a:focus {
        background-color: #f6f6f6;
        outline: 0;
      }
    </style>

    <div class="search-result">
      <a href="#" (click)="handleClick($event)">{{item.place_name}}</a>
    </div>
  `
})
export default class SearchResult {

  public item = {};

  handleClick(event) {
    event.preventDefault();
  }

}
