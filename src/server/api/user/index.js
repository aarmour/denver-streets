'use strict';

const MapboxClient = require('mapbox');
const handlers = require('./handlers');

exports.register = register;

exports.register.attributes = {
  pkg: require('./package.json')
};

function register(server, options, next) {
  server.bind({
    mapboxClient: new MapboxClient(options.mapbox.accessToken)
  });

  server.route({
    method: 'GET',
    path: '/user/location',
    handler: handlers.location.view
  });

  server.route({
    method: 'PUT',
    path: '/user/location',
    handler: handlers.location.update
  });

  server.route({
    method: 'GET',
    path: '/user/location/search/q/{query}',
    handler: handlers.locationQuery.view
  });

  next();
}
