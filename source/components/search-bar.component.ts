import { Component, Output, EventEmitter } from 'angular2/core';
import { FORM_DIRECTIVES } from 'angular2/common';

@Component({
  selector: 'search-bar',
  directives: [FORM_DIRECTIVES],
  inputs: ['placeholder'],
  template: `
    <style>
      .search-box {
        position: relative;
      }

      .search-box > button {
        display: inline-block;
        position: absolute;
        top: 5px;
        right: 5px;
        padding: 6px;
        border: 0;
        border-radius: 3px;
        font-size: 0.8em;
        color: #fff;
        background-color: rgb(0, 116, 228);
      }

      .search-input {
        width: 100%;
        padding: 9px 72px 10px 20px;
        border: 0;
        border-radius: 4px;
        box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.1);
        color: #333;
      }

      .search-input:focus {
        outline: 0;
      }
    </style>

    <form role="search" (ngSubmit)="handleSubmit()">
      <div class="search-box">
        <input
          class="search-input"
          type="text"
          autocomplete="off"
          autocorrect="off"
          tabindex="1"
          placeholder="{{placeholder}}"
          [(ngModel)]="query">
        <button type="submit">Search</button>
      </div>
    </form>
  `
})
export default class SearchBar {

  @Output() search = new EventEmitter();

  public placeholder: string = 'Enter an address';
  private query: string = '';

  handleSubmit() {
    const query = this.query;

    if (query) {
      this.search.next(query);
    }
  }
}
