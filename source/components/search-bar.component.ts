import { Component, Output, EventEmitter } from 'angular2/core';
import { FORM_DIRECTIVES } from 'angular2/common';

@Component({
  selector: 'search-bar',
  directives: [FORM_DIRECTIVES],
  inputs: [
    'placeholder',
    'lastQuery'
  ],
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
        padding: 8px 72px 10px 20px;
        border: 0;
        border-radius: 4px;
        color: #333;
      }

      .search-box.has-summary .search-input {
        border-radius: 4px 4px 0px 0px;
      }

      .search-input:focus {
        outline: 0;
      }

      .search-summary {
        padding: 15px;
        background: rgba(60, 60, 60, 0.75);
        color: #fff;
        border-radius: 0px 0px 4px 4px;
        font-size: 0.8em;
        text-transform: uppercase;
      }

      .label {
        color: #B2DBFF;
        margin-right: 10px;
      }
    </style>

    <form role="search" (ngSubmit)="handleSubmit()">
      <div class="search-box" [ngClass]="{'has-summary': lastQuery}">
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
      <div *ngIf="lastQuery" class="search-summary">
        <span class="label">Last search</span> {{lastQuery}}
      </div>
    </form>
  `
})
export default class SearchBar {

  @Output() search = new EventEmitter();

  public placeholder: string = '';
  public lastQuery: string = '';
  private query: string = '';

  handleSubmit() {
    const query = this.query;

    if (query) {
      this.search.next(query);
    }
  }
}
