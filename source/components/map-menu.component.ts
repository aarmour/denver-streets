import { Component } from 'angular2/core';
import { NgClass } from 'angular2/common';

@Component({
  selector: 'map-menu',
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
        max-width: 16em;
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
      }
    </style>

    <div class="menu mapboxgl-ctrl-group mapboxgl-ctrl" [ngClass]="{expanded: isExpanded}">
      <button class="toggle" (click)="toggle()">Menu</button>
      <div class="content">
        --------------- FPO ---------------
      </div>
    </div>
  `,
  directives: [NgClass]
})
export default class MapMenu {
  isExpanded = false;

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
