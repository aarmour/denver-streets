const mapbox = require('mapbox-gl');
const { Control, util } = mapbox;

const DEFAULT_OPTIONS = {
  position: 'top-right',
  tiltPitch: 60
};

class Menu extends Control {

  constructor(options = DEFAULT_OPTIONS) {
    super(options);
    util.setOptions(this, options);
  }

  onAdd(map) {
    const { tiltPitch } = this.options;
    const className = 'mapboxgl-ctrl';
    const container = this.container = document.createElement('div');

    container.classList.add(className);
    container.classList.add('mapboxgl-ctrl-menu-container');
    container.classList.add(`${className}-group`);

    const toggle = document.createElement('button');

    toggle.classList.add('mapboxgl-ctrl-menu');
    toggle.classList.add('mapboxgl-ctrl-icon');
    toggle.addEventListener('click', this.toggle.bind(this));
    container.appendChild(toggle);

    const menuItems = this.menuItems = document.createElement('ul');

    menuItems.classList.add('mapboxgl-ctrl-menu-items');
    menuItems.appendChild(this.createCheckboxMenuItem('Tilt', (e) => {
      map.easeTo({ pitch: e.target.checked ? tiltPitch : 0 });
    }));

    container.appendChild(menuItems);

    return container;
  }

  createCheckboxMenuItem(labelText, onChange) {
    const container = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');

    input.type = 'checkbox';
    input.addEventListener('change', onChange);

    label.appendChild(input);
    label.appendChild(document.createTextNode(' ' + labelText));
    container.appendChild(label);

    return container;
  }

  toggle() {
    const isOpen = this.menuItems.classList.contains('open');

    this.menuItems.classList[isOpen ? 'remove' : 'add']('open');
  }
}

module.exports = Menu;
