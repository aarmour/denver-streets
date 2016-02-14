import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import IndexPanel from './IndexPanel';
import {
  SearchBar,
  Panel,
  MapGL
} from '../components';

class Home extends Component {

  constructor(props) {
    super(props);
    this.handleSearchBarSubmit = this.handleSearchBarSubmit.bind(this);
  }

  get styles() {
    return {
      root: { height: '100%' },
      content: { height: '100%' },
      searchBarContainer: {
        position: 'absolute',
        zIndex: 2,
        width: 350
      }
    };
  }

  renderContent() {
    const { content } = this.props;

    if (content) return content;

    const zoom = 12;
    const center = [-104.9848, 39.7392];
    const maxBounds = [[-105.27, 39.35], [-104.60, 39.93]];

    return (
      <MapGL
        zoom={zoom}
        center={center}
        maxBounds={maxBounds}
      />
    );
  }

  render() {
    const { styles } = this;

    return (
      <div style={styles.root}>
        <div style={styles.searchBarContainer}>
          <SearchBar onSubmit={this.handleSearchBarSubmit} />
        </div>
        <Panel>{this.props.panel || <IndexPanel />}</Panel>
        <div style={styles.content}>{this.renderContent()}</div>
      </div>
    );
  }

  handleSearchBarSubmit(query) {
    browserHistory.push(`/search/q/${query}`);
  }

}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Home);
