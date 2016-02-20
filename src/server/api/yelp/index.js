'use strict';

const Joi = require('joi');
const YelpClient = require('yelp');
const handlers = require('./handlers');

exports.register = register;

exports.register.attributes = {
  pkg: require('./package.json')
};

function register(server, options, next) {
  server.bind({
    client: new YelpClient({
      consumer_key: options.consumerKey,
      consumer_secret: options.consumerSecret,
      token: options.token,
      token_secret: options.tokenSecret
    })
  });

  server.ext('onPreHandler', handlers.pagination, { sandbox: 'plugin' });
  server.ext('onPostHandler', handlers.response, { sandbox: 'plugin' });

  server.route({
    method: 'GET',
    path: '/yelp/search/q/{query}',
    handler: handlers.query.view,
    config: {
      validate: {
        query: {
          page: Joi.number().integer().min(1).max(1000)
        }
      }
    }
  });

  next();
}
