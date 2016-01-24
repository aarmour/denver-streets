import { Component, EventEmitter } from 'angular2/core';

@Component({
  selector: 'side-panel',
  inputs: [
    'isOpen',
    'showCloseBtn'
  ],
  template: `
    <style>
      .side-panel {
        position: absolute;
        top: 0;
        left: -22em;
        width: 22em;
        height: 100%;
        padding: 1em;
        z-index: 1;
        background-color: #fff;
        box-shadow: 1px 0px 2px rgba(0,0,0,0.3);
        transition: all 0.2s ease-in-out;
      }

      .side-panel.open {
        left: 0;
      }

      .content {
        height: inherit;
        overflow-y: scroll;
      }

      .btn-close {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        padding: 0;
        border: 0;
        background: transparent;
      }

      .btn-close::before {
        display: table-cell;
        vertical-align: middle;
        content: '×';
        color: #b5b5b5;
        font-size: 2em;
        line-height: 0;
      }

      .toggle-tab {
        position: absolute;
        top: 8px;
        left: 100%;
      }

      .toggle-tab button {
        height: 42px;
        color: #A5A5A5;
        background: #fff;
        border: solid 1px #ddd;
        outline: 0;
      }

      .toggle-tab button:focus {
        background: #f3f3f3;
      }
    </style>

    <div class="side-panel" [ngClass]="{open: isOpen}">
      <button class="btn-close" *ngIf="showCloseBtn" (click)="close()"></button>
      <div class="toggle-tab" *ngIf="showToggleTab">
        <button (click)="toggle()">
          <span *ngIf="isOpen">≪</span>
          <span *ngIf="!isOpen">≫</span>
        </button>
      </div>
      <div class="content">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export default class SidePanel {

  public isOpen: boolean = false;
  public showCloseBtn: boolean = false;
  public showToggleTab: boolean = true;

  close() {
    this.isOpen = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
