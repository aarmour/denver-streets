import { Component, EventEmitter } from 'angular2/core';

@Component({
  selector: 'side-panel',
  inputs: [
    'isOpen',
    'showCloseBtn'
  ],
  styles: [require('./side-panel.style.css')],
  template: require('./side-panel.template.html')
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
