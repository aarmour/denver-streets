import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { MapGL, GeoJSONLayer } from '../../components';

class Map extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { map, query, maxBounds } = this.props;

    const layout = {
      'icon-image': '{marker-symbol}'
    };

    const data = map.pois[query] || { type: 'FeatureCollection', features: [] };

    return (
      <MapGL
        zoom={map.zoom}
        center={map.center}
        maxBounds={maxBounds}
      >
        <GeoJSONLayer id="pois" data={data} layout={layout} />
      </MapGL>
    );
  }

}

Map.propTypes = {
  maxBounds: PropTypes.array
};

Map.defaultProps = {
  maxBounds: [[-105.27, 39.35], [-104.60, 39.93]]
};

function mapStateToProps(state) {
  return {
    map: state.map
  };
}

export default connect(mapStateToProps)(Map);
