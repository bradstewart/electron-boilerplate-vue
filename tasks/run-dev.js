/**
 * Runs both the express dev server AND the electron client with
 * a single command. When one process exits, both processes exit.
 */

'use strict'

const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('../webpack.config')
const exec = require('child_process').exec

const devServer = express()
const compiler = webpack(config)

const PORT = 3000

/**
 * Express development server.
 */

// Install and configure the Express webpack middleware.
devServer.use(
  require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
    },
  })
)

// Install and configure the Express webpack-hot-reload middleware.
devServer.use(
  require('webpack-hot-middleware')(compiler)
)

// Wildcard route to return the app.html file. 
devServer.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'app', 'app.html'))
})

// Bind the Express server to localhost.
devServer.listen(PORT, 'localhost', (err) => {
  if (err) return console.error(`dev-server' ${err}`)

  console.log(`dev-server Listening at http://localhost:${PORT}`)
})

/**
 * Electron client.
 */

// Run the electron client as a child process, so we can make sure to
// close both processes when one exists.
const client = exec('npm run start:hot')

client.stdout.on('data', (data) => {
  console.log(`electron ${data}`)
})

client.stderr.on('data', (data) => {
  console.error(`electron ${data}`)
})

client.on('close', (code) => { 
  process.exit(code)
})
