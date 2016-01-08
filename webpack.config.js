
var path = require('path')
var webpack = require('webpack')

module.exports = {
  target: 'atom',
  entry: {
    app: './app/app.js',
  },
  output: {
    path: './build',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
    ]
  }
}
