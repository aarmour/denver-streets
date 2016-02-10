'use strict';

module.exports = register;

register.attributes = {
  name: 'my-denver.views',
  version: '1.0.0'
};

function register(server, options, next) {
  server.route({
    method: 'GET',
    path: '/{files*}',
    handler: require('./index-handler')
  });

  next();
}
