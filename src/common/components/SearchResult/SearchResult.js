import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon } from '../';

export default class SearchResult extends Component {

  render() {
    const { result } = this.props;

    return (
      <div className="search-result">
        <div className="search-result__icon">
          <Icon value={result.icon} />
        </div>
        <div className="search-result__content">
          <Link to={`/search/result/${result.slug}`}>{result.name}</Link>
        </div>
      </div>
    );
  }

}

SearchResult.propTypes = {
  result: PropTypes.object
};
