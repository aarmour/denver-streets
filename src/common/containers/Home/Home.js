import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import IndexPanel from '../IndexPanel';
import {
  SearchBar,
  Panel,
  MapGL
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

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(HomePage);
