'use strict';

exports.register = register;

register.attributes = {
  name: 'my-denver.api',
  version: '1.0.0'
};

function register(server, options, next) {
  server.register([
    {
      register: require('./user'),
      options: { mapbox: options.mapbox }
    },

    {
      register: require('./search'),
      options: { client: options.search.client }
    },

    {
      register: require('./yelp'),
      options: options.yelp
    }
  ], { routes: options.routes }, next);
}
