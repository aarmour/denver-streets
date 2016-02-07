'use strict';

const handlers = require('./handlers');

exports.register = register;

register.attributes = {
  pkg: require('./package.json')
};

function register(server, options, next) {
  server.bind({
    client: options.client
  });

  server.ext('onPostHandler', handlers.response, { sandbox: 'plugin' });

  server.route({
    method: 'GET',
    path: '/search/categories/{category}',
    handler: handlers.categories.view
  });

  server.route({
    method: 'GET',
    path: '/search/categories/{category}/q/{query}',
    handler: handlers.categoriesQuery.view
  });

  server.route({
    method: 'GET',
    path: '/search/q/{query}',
    handler: handlers.query.view
  });

  next();
}
