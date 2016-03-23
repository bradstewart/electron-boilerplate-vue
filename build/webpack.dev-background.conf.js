var webpack = require('webpack')
var merge = require('webpack-merge')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var baseConfig = require('./webpack.base.conf')

// var cssLoaders = require('./css-loaders')
// var HtmlWebpackPlugin = require('html-webpack-plugin')

// add hot-reload related code to entry chunks
// Object.keys(baseConfig.entry).forEach(function (name) {
//   baseConfig.entry[name] = ['./build/dev-client'].concat(baseConfig.entry[name])
// })

module.exports = merge(baseConfig, {
  entry: {
    background: './app/background.js'
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  output: {
    // necessary for the html plugin to work properly
    // when serving the html from in-memory
    publicPath: '/'
  },
  plugins: [
    // Copy files from app to dist
    new CopyWebpackPlugin([
      { from: './app/package.json' }
    ]),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        HOT: JSON.stringify(process.env.HOT)
      }
    }),

    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  stats: {
    colors: true
  }
})
