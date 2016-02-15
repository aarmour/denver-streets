import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSearchResults } from '../actions/search';
import Pagination from '../components/pagination';

class SearchResultsPanel extends Component {

  constructor(props) {
    super(props);
    this.handleSelectPrevPage = this.handleSelectPrevPage.bind(this);
    this.handleSelectNextPage = this.handleSelectNextPage.bind(this);
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
    const { handleSelectPrevPage, handleSelectNextPage } = this;
    const { pagination } = this.props;
    const { isFetching, prevPageUrl, nextPageUrl, selectedPage } = pagination;
    const { total, results } = pagination[selectedPage] || {};
    const hasPrev = !!prevPageUrl;
    const hasNext = !!nextPageUrl;

    if (isFetching) {
      return <div>Loading&hellip;</div>;
    }

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
        <Pagination
          hasPrev={hasPrev}
          hasNext={hasNext}
          onSelectPrev={handleSelectPrevPage}
          onSelectNext={handleSelectNextPage}
        />
      </div>
    );
  }

  handleSelectPrevPage() {
    const { query } = this.props.params;
    const { pagination, loadSearchResults } = this.props;
    const { prevPageUrl } = pagination;

    loadSearchResults(query, prevPageUrl);
  }

  handleSelectNextPage() {
    const { query } = this.props.params;
    const { pagination, loadSearchResults } = this.props;
    const { nextPageUrl } = pagination;

    loadSearchResults(query, nextPageUrl);
  }

}

SearchResultsPanel.propTypes = {
  pagination: PropTypes.object,
  loadSearchResults: PropTypes.func.isRequired
};

SearchResultsPanel.defaultProps = {
  pagination: {}
};

function mapStateToProps(state, ownProps) {
  return {
    pagination: state.pagination.searchResults[ownProps.params.query],
    // searchResults: state.searchResults
  };
}

export default connect(mapStateToProps, { loadSearchResults })(SearchResultsPanel);
