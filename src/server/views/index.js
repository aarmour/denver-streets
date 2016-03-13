'use strict';

module.exports = register;

register.attributes = {
  name: 'my-denver.views',
  version: '1.0.0'
};

function register(server, options, next) {
  server.bind({ accounts: options.accounts, mapbox: options.mapbox });

  server.route({
    method: 'GET',
    path: '/static/{filename}',
    handler: {
      file: request => `./dist/${request.params.filename}`
    }
  });

  server.route({
    method: 'GET',
    path: '/{files*}',
    handler: require('./index-handler')
  });

  next();
}
