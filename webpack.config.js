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
  entry: './source/main.ts',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  resolve: {
    extensions: ['','.ts','.js','.json','.css','.html']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          'ignoreDiagnostics': [
            2403, // 2403 -> Subsequent variable declarations
            2300, // 2300 -> Duplicate identifier
            2374, // 2374 -> Duplicate number index signature
            2375  // 2375 -> Duplicate string index signature
          ]
        },
        exclude: [ /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/ ]
      },
      { test: /\.json$/,  loader: 'json-loader' },
      { test: /\.css$/,   loader: 'raw-loader' },
      { test: /\.html$/,  loader: 'raw-loader' }
    ]
  },

  plugins: [
    // new CopyWebpackPlugin([{ from: 'source/assets', to: 'assets' }]),
    // generating html
    // new HtmlWebpackPlugin({ template: './index.html', inject: false }),
    // replace
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV)
      }
    })
  ],

  // Fix es6-shim
  node: {
    global: 'window',
    progress: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
