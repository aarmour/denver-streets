import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSearchResults } from '../actions/search';

class SearchResultsPanel extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadSearchResults(this.props.params.query);
  }

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.params.query;
    const newQuery = this.props.params.query;

    if (newQuery !== oldQuery) {
      this.props.loadSearchResults(this.props.params.query);
    }
  }

  renderSearchResult(searchResult) {
    const { name } = searchResult;

    return (
      <div>
        {name}
      </div>
    );
  }

  render() {
    const { total, results } = this.props.searchResults;

    if (!total) {
      return <div>No results</div>;
    }

    return (
      <div>
        <ul>
          {results.map(searchResult => {
            return <li key={searchResult.slug}>{this.renderSearchResult(searchResult)}</li>;
          })}
        </ul>
      </div>
    );
  }

}

SearchResultsPanel.propTypes = {
  loadSearchResults: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    searchResults: state.searchResults
  };
}

export default connect(mapStateToProps, { loadSearchResults })(SearchResultsPanel);
