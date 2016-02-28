import { canUseDOM } from 'exenv';
import React, { Component, PropTypes } from 'react';

let mapbox;

if (canUseDOM) {
  mapbox = require('mapbox-gl');
}

export default class MapGL extends Component {

  constructor(props) {
    super(props);
    this.state = { id: this.props.id };
  }

  getChildContext() {
    return { map: () => this.map };
  }

  componentDidMount() {
    if (!mapbox) return;

    const { Map } = mapbox;

    this.map = new Map({
      container: this.state.id,
      style: this.props.mapStyle,
      zoom: this.props.zoom,
      center: this.props.center,
      maxBounds: this.props.maxBounds
    });
  }

  componentWillReceiveProps(newProps) {
    if (!mapbox) return;

    const newState = this.updateStateFromProps(newProps);

    this.setState(newState);
  }

  componentDidUpdate() {
    this.updateViewport();
  }

  get styles() {
    const map = {};

    if (this.props.fillHeight) {
      map.height = '100%';
    }

    return {map};
  }

  render() {
    const { id } = this.state;
    const { styles } = this;

    return <div id={id} style={styles.map}>{this.props.children}</div>;
  }

  updateStateFromProps(props) {
    const newState = {
      mapStyle: props.mapStyle,
      center: props.center,
      bounds: props.bounds,
      zoom: props.zoom
    };

    return newState;
  }

  updateViewport() {
    const { center, zoom } = this.state;

    this.map.flyTo({center, zoom});
  }

}

MapGL.childContextTypes = {
  map: PropTypes.func
};

MapGL.propTypes = {
  id: PropTypes.string,
  mapStyle: PropTypes.string,
  center: PropTypes.array,
  bounds: PropTypes.array,
  zoom: PropTypes.number,
  fillHeight: PropTypes.bool
};

MapGL.defaultProps = {
  id: 'map',
  mapStyle: 'mapbox://styles/aarmour/cil5be3x0009aaam4qqkhngv1',
  fillHeight: true
};
