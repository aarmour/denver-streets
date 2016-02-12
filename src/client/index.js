import 'babel-polyfill';
import mapboxgl from 'mapbox-gl';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';
import routes from '../common/routes';

const mapbox = window.__MAPBOX__;
mapboxgl.accessToken = mapbox.accessToken;

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);

const rootElement = document.getElementById('app');

render(
  <Provider store={store}>
    {routes}
  </Provider>,
  rootElement
);
