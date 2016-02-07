'use strict';

const handlers = require('./handlers');

exports.register = register;

register.attributes = {
  pkg: require('./package.json')
};

function register(server, options, next) {
  server.route({
    method: 'GET',
    path: '/search',
    handler: handlers.view
  });

  next();
}
