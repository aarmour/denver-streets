const path = require('path');
const webpack = require('webpack');

module.exports = {

  debug: true,

  devtool: 'inline-source-map',

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
    extensions: ['', '.js', '.json', '.css', '.html']
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
