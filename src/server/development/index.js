module.exports = register;

register.attributes = {
  name: 'my-denver.development',
  version: '1.0.0'
};

function register(server, options, next) {
  if (options.env !== 'development') return next();

  server.register({
    register: require('hapi-webpack-plugin'),
    options: options.webpackConfig
  }, next);
}
