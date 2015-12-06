'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  debug: true,
  devtool: 'source-map',
  entry: {
    'index.ios': ['./src/main.ios.js'],
    'index.android': ['./src/main.android.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx|es6)$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-1', 'react']
        }
      }
    ]
  }
};

