import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import IndexPanel from '../IndexPanel';
import {
  SearchBar,
  Panel,
  MapGL,
  GeoJSONLayer
} from '../../components';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = { query: props.params.query };
    this.handleSearchBarSubmit = this.handleSearchBarSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.params.query;
    const newQuery = this.props.params.query;

    if (newQuery !== oldQuery) {
      this.setState({ query: newQuery });
    }
  }

  renderContent() {
    const { content, map } = this.props;
    const { query } = this.state;

    if (content) return content;

    const maxBounds = [[-105.27, 39.35], [-104.60, 39.93]];

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

  render() {
    const { query } = this.state;

    return (
      <div className="home-page">
        <div className="home-page__search-bar-container">
          <SearchBar onSubmit={this.handleSearchBarSubmit} value={query} />
        </div>
        <Panel>{this.props.panel || <IndexPanel />}</Panel>
        <div className="home-page__content">{this.renderContent()}</div>
      </div>
    );
  }

  handleSearchBarSubmit(query) {
    browserHistory.push(`/search/q/${query}`);
  }

}

function mapStateToProps(state) {
  return {
    map: state.map
  };
}

export default connect(mapStateToProps)(HomePage);
