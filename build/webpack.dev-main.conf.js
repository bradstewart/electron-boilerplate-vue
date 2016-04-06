var webpack = require('webpack')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpackBaseConfig = require('./webpack.base.conf')
var config = require('../config')
var cssLoaders = require('./css-loaders')

var devServerUrl = 'http://localhost:' + config.dev.port + '/'

// webpackBaseConfig.

// add hot-reload related code to entry chunks
// Object.keys(webpackBaseConfig.entry).forEach(function (name) {
//   webpackBaseConfig.entry[name] = [].concat(webpackBaseConfig.entry[name])
// })

module.exports = merge(webpackBaseConfig, {
  entry: {
    app: [
      './build/dev-client?path=' + devServerUrl + '__webpack_hmr&noInfo=true&reload=true',
      './app/main.js'
    ]
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  output: {
    // necessary for the html plugin to work properly
    // when serving the html from in-memory
    // need to explicitly set localhost to prevent
    // the hot updates from looking for local files
    publicPath: devServerUrl
  },
  vue: {
    loaders: cssLoaders({
      sourceMap: false,
      extract: false
    })
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: './app/main.html',
      inject: true
    })
  ]
})
