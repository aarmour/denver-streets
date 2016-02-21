import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSearchResults, loadYelpSearchResults } from '../../actions/search';
import {
  List,
  NavItem,
  Pagination,
  ProgressIndicator,
  SearchResult,
  SideNav,
  YelpSearchResult
} from '../../components';

class SearchResultsPanel extends Component {

  constructor(props) {
    super(props);
    this.state = { activeNavItem: 'default' };
    this.handleSelectPrevPage = this.handleSelectPrevPage.bind(this);
    this.handleSelectNextPage = this.handleSelectNextPage.bind(this);
    this.handleSelectNavItem = this.handleSelectNavItem.bind(this);
  }

  componentDidMount() {
    this.loadSearchResultsForActiveNavItem();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.params.query;
    const newQuery = this.props.params.query;

    if (newQuery !== oldQuery) {
      this.loadSearchResultsForActiveNavItem();
    }
  }

  renderContent() {
    const { handleSelectNavItem } = this;
    const { activeNavItem } = this.state;

    let searchResults = activeNavItem === 'yelp' ?
      this.props.yelpSearchResults : this.props.searchResults;

    if (!searchResults) return;

    const { isFetching, selectedPage } = searchResults;
    const resultsForPage = searchResults[selectedPage] || {};
    const { total } = resultsForPage;
    let content;

    if (isFetching) {
      content = <ProgressIndicator />;
    } else if (!total) {
      content = <div>No results</div>;
    } else {
      let listItems;

      if (activeNavItem === 'yelp') {
        const { businesses } = resultsForPage;

        listItems = businesses.map(this.renderYelpSearchResult);
      } else {
        const { results } = searchResults[selectedPage] || {};

        listItems = results.map(this.renderSearchResult);
      }

      content = <List items={listItems} key="slug" />;
    }

    return (
      <div>
        <SideNav>
          <NavItem
            name="default"
            icon="dot-circle-o"
            tooltip="Search"
            active={activeNavItem === 'default'}
            onClick={handleSelectNavItem}
          />
          <NavItem
            name="yelp"
            icon="yelp"
            tooltip="Search Yelp"
            active={activeNavItem === 'yelp'}
            onClick={handleSelectNavItem}
          />
        </SideNav>
        <div className="search-results-panel__search-results">
          {content}
        </div>
      </div>
    );
  }

  renderFooter() {
    const { handleSelectPrevPage, handleSelectNextPage } = this;
    const { searchResults } = this.props;
    const { prevPageUrl, nextPageUrl } = searchResults;
    const hasPrev = !!prevPageUrl;
    const hasNext = !!nextPageUrl;

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
    return <SearchResult result={searchResult} />;
  }

  renderYelpSearchResult(searchResult) {
    return <YelpSearchResult {...searchResult} />;
  }

  render() {

    return (
      <div className="search-results-panel">
        <div className="search-results-panel__search-bar-spacer"></div>
        <div className="search-results-panel__content">
          {this.renderContent()}
        </div>
        <div className="search-results-panel__footer">
          {this.renderFooter()}
        </div>
      </div>
    );
  }

  loadSearchResultsForActiveNavItem() {
    const { activeNavItem } = this.state;
    const { query } = this.props.params;

    if (activeNavItem === 'yelp') {
      this.props.loadYelpSearchResults(query);
    } else {
      this.props.loadSearchResults(query);
    }
  }

  handleSelectPrevPage() {
    const { query } = this.props.params;
    const { searchResults, loadSearchResults } = this.props;
    const { prevPageUrl } = searchResults;

    loadSearchResults(query, prevPageUrl);
  }

  handleSelectNextPage() {
    const { query } = this.props.params;
    const { searchResults, loadSearchResults } = this.props;
    const { nextPageUrl } = searchResults;

    loadSearchResults(query, nextPageUrl);
  }

  handleSelectNavItem(name) {
    this.setState({ activeNavItem: name },
      () => this.loadSearchResultsForActiveNavItem());
  }

}

SearchResultsPanel.propTypes = {
  searchResults: PropTypes.object,
  loadSearchResults: PropTypes.func.isRequired,
  loadYelpSearchResults: PropTypes.func.isRequired
};

SearchResultsPanel.defaultProps = {
  searchResults: {}
};

function mapStateToProps(state, ownProps) {
  return {
    searchResults: state.pagination.searchResults[ownProps.params.query],
    yelpSearchResults: state.pagination.yelpSearchResults[ownProps.params.query]
  };
}

export default connect(mapStateToProps, {
  loadSearchResults,
  loadYelpSearchResults
})(SearchResultsPanel);
