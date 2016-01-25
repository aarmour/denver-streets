import { Component, Output, EventEmitter } from 'angular2/core';
import { FORM_DIRECTIVES } from 'angular2/common';

@Component({
  selector: 'search-bar',
  directives: [FORM_DIRECTIVES],
  inputs: [
    'placeholder',
    'lastQuery',
    'disabled'
  ],
  styles: [require('./search-bar.style.css')],
  template: require('./search-bar.template.html')
})
export default class SearchBar {

  @Output() search = new EventEmitter();

  public placeholder: string = '';
  public disabled: boolean = false;
  public lastQuery: string = '';
  private query: string = '';

  handleSubmit() {
    const query = this.query;

    if (query) {
      this.search.next(query);
    }
  }

  handleClickLastQuery(event, query) {
    this.search.next(query);
    event.preventDefault();
    this.query = '';
  }
}
