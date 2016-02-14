import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { App, Home, SearchResultsPanel } from '../containers';

export default (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Home}>
        <Route path="search/q/:query" components={{ panel: SearchResultsPanel }} />
        <Redirect from="*" to="/" />
      </Route>
    </Route>
  </Router>
);
