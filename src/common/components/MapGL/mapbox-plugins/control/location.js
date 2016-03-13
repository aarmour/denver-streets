const mapbox = require('mapbox-gl');
const { Control, util } = mapbox;

const DEFAULT_OPTIONS = {
  position: 'top-right'
};

const ICON_CLASS = 'fa-dot-circle-o';

class LocationControl extends Control {

  constructor(options = DEFAULT_OPTIONS) {
    super(options);
    util.setOptions(this, options);
  }

  onAdd(map) {
    const className = 'mapboxgl-ctrl';
    const container = this.container = document.createElement('div');

    container.classList.add(className);
    container.classList.add('mapboxgl-ctrl-location-container');
    container.classList.add(`${className}-group`);

    const toggle = document.createElement('button');

    if (!('geolocation' in navigator)) {
      // Geolocation services are not available
      toggle.setAttribute('disabled', '');
      toggle.setAttribute('title', 'Geolocation services are not available');
    }

    toggle.classList.add('mapboxgl-ctrl-location');
    toggle.classList.add('mapboxgl-ctrl-icon');
    toggle.classList.add('fa');
    toggle.classList.add(ICON_CLASS);
    toggle.addEventListener('click', this.getLocation.bind(this, map));
    container.appendChild(toggle);

    this.toggle = toggle;

    return container;
  }

  getLocation(map) {
    this.toggleProgress();
    navigator.geolocation.getCurrentPosition(position => {
      const { coords } = position;

      this.toggleProgress();
      map.flyTo({ center: [coords.longitude, coords.latitude] });
    });
  }

  toggleProgress() {
    const { toggle } = this;

    this.busy = !this.busy;

    if (this.busy) {
      toggle.setAttribute('disabled', '');
    } else {
      toggle.removeAttribute('disabled');
    }
  }

}

module.exports = LocationControl;
