import { Component, Output, EventEmitter } from 'angular2/core';
import { NgClass } from 'angular2/common';
import MapMenuSection from './map-menu-section.component';

@Component({
  selector: 'map-menu',
  directives: [
    NgClass,
    MapMenuSection
  ],
  template: `
    <style>
      .menu {
        display: block;
        position: relative;
        z-index: 1;
        -webkit-transition: all 0.3s ease-out;
        -moz-transition: all 0.3s ease-out;
        -ms-transition: all 0.3s ease-out;
        -o-transition: all 0.3s ease-out;
        transition: all 0.3s ease-out;
        position: absolute;
        top: 0;
        left: 0;
        margin: 10px 0 0 10px;
      }

      .menu.expanded .content {
        display: block;
      }

      .toggle {
        border: 0;
      }

      .content {
        display: none;
        padding: 10px;
        width: 16em;
      }
    </style>

    <div class="menu mapboxgl-ctrl-group mapboxgl-ctrl" [ngClass]="{expanded: isExpanded}">
      <button class="toggle" (click)="toggle()">Menu</button>
      <div class="content">
        <map-menu-section>
          <label>
            <input type="checkbox" (change)="handleUpdateOptions($event, {isTilted: $event.target.checked})"> Tilt
          </label>
        </map-menu-section>
      </div>
    </div>
  `
})
export default class MapMenu {
  @Output() changeOptions = new EventEmitter();

  isExpanded = false

  options = {
    isTilted: false
  };

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  handleUpdateOptions($event, newOption) {
    this.options = Object.assign({}, this.options, newOption);
    this.changeOptions.next(Object.assign({}, this.options));
  }
}
