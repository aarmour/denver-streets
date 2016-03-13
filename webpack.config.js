const path = require('path');
const webpack = require('webpack');

module.exports = {

  devtool: 'source-map',

  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr',
    './src/client/index.js'
  ],

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  assets: {
    publicPath: '/static/'
  },

  resolve: {
    extensions: ['', '.js', '.json', '.css', '.html'],
    alias: {
      // Workaround for https://github.com/mapbox/mapbox-gl-js/issues/1649
      'mapbox-gl': path.resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
    }
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'raw' },
      { test: /\.html$/, loader: 'raw' }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

};
