import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSearchResults } from '../../actions/search';
import { centerMap } from '../../actions/map';
import BasePanel from '../BasePanel';
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
    this.handleSelectNavItem = this.handleSelectNavItem.bind(this);
    this.handleClickYelpSearchResult = this.handleClickYelpSearchResult.bind(this);
  }

  get provider() {
    return this.state.activeNavItem;
  }

  get searchResultsForPage() {
    return this.props.searchResults[this.state.activeNavItem];
  }

  get query() {
    return this.props.params.query;
  }

  componentDidMount() {
    this.props.loadSearchResults(this.query, this.provider);
  }

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.params.query;
    const newQuery = this.props.params.query;

    if (newQuery !== oldQuery) {
      this.props.loadSearchResults(newQuery, this.provider);
    }
  }

  renderContent() {
    const { handleSelectNavItem } = this;
    const { activeNavItem } = this.state;

    if (!this.props.searchResults[this.provider]) return;

    const searchResults = this.props.searchResults[this.provider];
    let content;

    if (searchResults.isFetching) {
      content = (
        <div className="search-results-panel__progress-indicator">
          <ProgressIndicator />
        </div>
      );
    } else {
      const searchResultsForPage = searchResults[searchResults.selectedPage];

      if (!searchResultsForPage.total) {
        content = <div className="search-results-panel__empty">No results</div>;
      } else {
        let listItems;

        if (activeNavItem === 'yelp') {
          const { businesses } = searchResultsForPage;

          listItems = businesses.map(this.renderYelpSearchResult.bind(this));
        } else {
          const { results } = searchResultsForPage;

          listItems = results.map(this.renderSearchResult.bind(this));
        }

        content = <List items={listItems} key="slug" />;
      }
    }

    return (
      <div>
        <SideNav>
          <NavItem
            name="default"
            icon="home"
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
    const { searchResultsForPage } = this;
    const { loadSearchResults } = this.props;

    if (!searchResultsForPage) return;

    const { prevPageUrl, nextPageUrl } = searchResultsForPage;
    const hasPrev = !!prevPageUrl;
    const hasNext = !!nextPageUrl;

    return (
      <Pagination
        hasPrev={hasPrev}
        hasNext={hasNext}
        onSelectPrev={loadSearchResults.bind(null, this.query, this.provider, prevPageUrl)}
        onSelectNext={loadSearchResults.bind(null, this.query, this.provider, nextPageUrl)}
      />
    );
  }

  renderSearchResult(searchResult) {
    return <SearchResult result={searchResult} />;
  }

  renderYelpSearchResult(searchResult) {
    return <YelpSearchResult {...searchResult} onClick={this.handleClickYelpSearchResult} />;
  }

  render() {

    return (
      <BasePanel>
        <div className="search-results-panel__content">
          {this.renderContent()}
        </div>
        <div className="search-results-panel__footer">
          {this.renderFooter()}
        </div>
      </BasePanel>
    );
  }

  handleSelectNavItem(name) {
    this.setState({ activeNavItem: name }, () => {
      const provider = this.state.activeNavItem;
      const { query } = this.props.params;

      this.props.loadSearchResults(query, provider);
    });
  }

  handleClickYelpSearchResult(result) {
    const yelpCoordinates = result.location.coordinate;
    const mapCoordinates = [yelpCoordinates.longitude, yelpCoordinates.latitude];

    this.props.centerMap(mapCoordinates);
  }

}

SearchResultsPanel.propTypes = {
  searchResults: PropTypes.object,
  loadSearchResults: PropTypes.func.isRequired,
  loadYelpSearchResults: PropTypes.func.isRequired,
  centerMap: PropTypes.func.isRequired
};

SearchResultsPanel.defaultProps = {
  searchResults: {}
};

function mapStateToProps(state) {
  return {
    searchResults: state.pagination.searchResults
  };
}

export default connect(mapStateToProps, {
  loadSearchResults,
  centerMap
})(SearchResultsPanel);
