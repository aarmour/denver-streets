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

  componentDidMount() {
    if (!mapbox) return;

    const { Map } = mapbox;

    const map = new Map({
      container: this.state.id,
      style: this.props.mapStyle,
      zoom: this.props.zoom,
      center: this.props.center,
      maxBounds: this.props.maxBounds
    });

    this.setState({ map });
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

    return <div id={id} style={styles.map}></div>;
  }

}

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
  mapStyle: 'mapbox://styles/mapbox/emerald-v8',
  fillHeight: true
};
