import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSearchResults } from '../../actions/search';
import {
  Pagination,
  ProgressIndicator
} from '../../components';

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

  renderContent() {
    const { pagination } = this.props;
    const { isFetching, selectedPage } = pagination;
    const { total, results } = pagination[selectedPage] || {};

    if (isFetching) {
      return <ProgressIndicator />;
    }

    if (!total) {
      return <div>No results</div>;
    }

    return (
      <ul>
      {results.map(searchResult => {
        return <li key={searchResult.slug}>{this.renderSearchResult(searchResult)}</li>;
      })}
      </ul>
    );
  }

  renderPager() {
    const { handleSelectPrevPage, handleSelectNextPage } = this;
    const { pagination } = this.props;
    const { isFetching, prevPageUrl, nextPageUrl } = pagination;
    const hasPrev = !!prevPageUrl;
    const hasNext = !!nextPageUrl;

    if (isFetching) return;

    return (
      <Pagination
      hasPrev={hasPrev}
      hasNext={hasNext}
      onSelectPrev={handleSelectPrevPage}
      onSelectNext={handleSelectNextPage}
      />
    );
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

    return (
      <div>
        <div className="search-results-panel__search-bar-spacer"></div>
        <div className="search-results-panel__content">
          {this.renderContent()}
        </div>
        <div className="search-results-panel__pager-container">
          {this.renderPager()}
        </div>
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
    pagination: state.pagination.searchResults[ownProps.params.query]
  };
}

export default connect(mapStateToProps, { loadSearchResults })(SearchResultsPanel);
