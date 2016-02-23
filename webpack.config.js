'use strict'

const path = require('path')
const webpack = require('webpack')
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer')

const baseConfig = {
  entry: 
    ['./app/app.js'],
    // background: './app/background.js',
  
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {

    extensions: [
      '',
      '.css',
      '.js',
      '.html', 
      '.vue',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
    ]
  },
  plugins: [

  ],
  vue: {
    loaders: {
      js: 'babel!eslint'
    }
  }
}

const config = Object.create(baseConfig)

/**
 * Development specific configuration.
 */
// if (process.env.NODE_ENV == 'development') {
  config.debug = true
  config.devtool = "#inline-source-map"
  config.entry.push('webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr')
  config.output.publicPath = 'http://localhost:3000/dist/'

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      '__DEV__': true,
      'process.env.APP_ENV': JSON.stringify(require('./config/development.js')),
      'process.env.NODE_ENV': JSON.stringify('development'),
    })
  )
// }

/**
 * Production specific configuration.
 */
if (process.env.NODE_ENV == 'production') {
  config.output.publicPath = './dist/'

  let env = Object.assign(require('./config/production.js'), { NODE_ENV })

  config.plugins.push(
    new webpack.DefinePlugin({
      '__DEV__': false,
      'process.env': JSON.stringify(env),
    })
    // new ExtractTextPlugin('style.css', { allChunks: true })
  )
}

config.target = webpackTargetElectronRenderer(config)

module.exports = config
