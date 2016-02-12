import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { App, SearchResultsPanel } from '../containers';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="search/q/:query" components={{ panel: SearchResultsPanel }} />
      <Redirect from="*" to="/" />
    </Route>
  </Router>
);
