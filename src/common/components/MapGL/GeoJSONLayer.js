import { canUseDOM } from 'exenv';
import { Component, PropTypes } from 'react';

let mapbox;

if (canUseDOM) {
  mapbox = require('mapbox-gl');
}

export default class GeoJSONLayer extends Component {

  constructor(props) {
    super(props);
    this.state = { data: props.data };
    this.handleClick = this.handleClick.bind(this);
    this.handleMousemove = this.handleMousemove.bind(this);
  }

  componentDidMount() {
    if (!mapbox) return;

    setTimeout(() => {
      const map = this.context.map();
      const { id, type, data, layout, interactive } = this.props;
      const { GeoJSONSource } = mapbox;
      const source = new GeoJSONSource({data});
      const sourceId = `${id}-source`;

      map.on('style.load', () => {
        map.addSource(sourceId, source);

        const layer = {
          id,
          type,
          source: sourceId,
          interactive,
          layout
        };

        map.on('mousemove', this.handleMousemove);
        map.on('click', this.handleClick);
        map.addLayer(layer);
      });

      this.source = source;
      this.sourceId = sourceId;
    }, 0);
  }

  componentDidUpdate() {
    this.updateSource();
  }

  componentWillReceiveProps(newProps) {
    if (!mapbox) return;

    const newState = this.updateStateFromProps(this.state, newProps);

    this.setState(newState);
  }

  componentWillUnmount() {
    const map = this.context.map();

    map.removeLayer(this.props.id);
    map.removeSource(this.sourceId);
  }

  render() {
    return null;
  }

  updateStateFromProps(state, props) {
    const newState = {
      data: props.data
    };

    Object.assign(newState, {
      prevData: state.data
    });

    return newState;
  }

  updateSource() {
    if (this.state.data !== this.state.prevData) {
      this.source.setData(this.state.data);
    }
  }

  handleMousemove(event) {
    const { id } = this.props;
    const map = this.context.map();

    map.featuresAt(event.point, { layer: id, radius: 10 }, (error, features) => {
      if (error) throw error;
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    });
  }

  handleClick(event) {
    const { id } = this.props;
    const map = this.context.map();

    map.featuresAt(event.point, { layer: id, radius: 10, includeGeometry: true }, (error, features) => {
      if (error) throw error;

      // TODO: callback with features[0]
    });
  }

}

GeoJSONLayer.contextTypes = {
  map: PropTypes.func.isRequired
};

GeoJSONLayer.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  data: PropTypes.object.isRequired,
  layout: PropTypes.object.isRequired,
  interactive: PropTypes.bool
};

GeoJSONLayer.defaultProps = {
  interactive: true,
  type: 'symbol'
};
