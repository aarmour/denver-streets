import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import {
  App,
  Home,
  LocationPanel,
  SearchResultsPanel,
  SearchResultDetailPanel
} from '../containers';

export default (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Home}>
        <Route path="location" components={{ panel: LocationPanel }} />
        <Route path="search/q/:query" components={{ panel: SearchResultsPanel }} />
        <Route path="search/result/:slug" components={{ panel: SearchResultDetailPanel }} />
        <Redirect from="*" to="/" />
      </Route>
    </Route>
  </Router>
);
