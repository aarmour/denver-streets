import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import IndexPanel from '../IndexPanel';
import Map from '../Map';
import { SearchBar, Panel } from '../../components';

export default class HomePage extends Component {

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

  render() {
    const { panel, content } = this.props;
    const { query } = this.state;

    return (
      <div className="home-page">
        <div className="home-page__search-bar-container">
          <SearchBar onSubmit={this.handleSearchBarSubmit} value={query} />
        </div>
        <Panel>{panel || <IndexPanel />}</Panel>
        <div className="home-page__content">{content || <Map query={query} />}</div>
      </div>
    );
  }

  handleSearchBarSubmit(query) {
    const path = query ? `/search/q/${query}` : '/';

    browserHistory.push(path);
  }

}

HomePage.propTypes = {
  panel: PropTypes.element,
  content: PropTypes.element
};
