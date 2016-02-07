'use strict';

exports.register = register;

register.attributes = {
  name: 'my-denver.api',
  version: '1.0.0'
};

function register(server, options, next) {
  server.register([
    require('./search')
  ], next);
}
