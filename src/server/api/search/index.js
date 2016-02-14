'use strict';

const handlers = require('./handlers');
const validations = require('./validations');

exports.register = register;

register.attributes = {
  pkg: require('./package.json')
};

function register(server, options, next) {
  server.bind({
    client: options.client
  });

  server.ext('onPreHandler', handlers.pagination, { sandbox: 'plugin' });
  server.ext('onPostHandler', handlers.response, { sandbox: 'plugin' });

  server.route({
    method: 'GET',
    path: '/search/categories/{category}',
    handler: handlers.categories.view,
    config: {
      validate: {
        query: Object.assign({}, validations.pagination)
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/search/categories/{category}/q/{query}',
    handler: handlers.categoriesQuery.view,
    config: {
      validate: {
        query: Object.assign({}, validations.pagination)
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/search/q/{query}',
    handler: handlers.query.view,
    config: {
      validate: {
        query: Object.assign({}, validations.pagination)
      }
    }
  });

  next();
}
