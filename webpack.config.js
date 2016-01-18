const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin  = require('copy-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = {

  debug: true,

  devtool: 'source-map',

  // entry: [
  //   'webpack-dev-server/client?http://localhost:3000',
  //   'webpack/hot/dev-server',
  //   './source/main.ts'
  // ],
  entry: [
    './source/vendor.js',
    './source/main.ts'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  resolve: {
    extensions: ['', '.js', '.ts', '.json', '.css', '.html'],
    alias: {
      // Workaround for https://github.com/mapbox/mapbox-gl-js/issues/1649
      'mapbox-gl': path.resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
    }
  },

  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'raw' },
      { test: /\.html$/, loader: 'raw' }
    ]
  },

  plugins: [
    // new CopyWebpackPlugin([{ from: 'source/assets', to: 'assets' }]),
    // generating html
    // new HtmlWebpackPlugin({ template: './index.html', inject: false }),
    // replace
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV)
      }
    })
  ]
};
