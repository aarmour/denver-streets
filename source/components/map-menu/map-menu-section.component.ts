import { Component } from 'angular2/core';

@Component({
  selector: 'map-menu-section',
  template: `
    <style>
      section {
        border-top: solid 1px #ccc;
        padding: 5px 0;
      }
    </style>

    <section>
      <ng-content></ng-content>
    </section>
  `
})
export default class MapMenuSection {}
