'use strict'

const path = require('path')
const menubar = require('menubar')

const index = process.env.HOT
  ? 'http://localhost:8080/main.html'
  : 'file://' + path.join(__dirname, 'main.html')

/**
 * Create the menubar instance.
 */
const mb = menubar({
  index: index,
  // icon: path.join(__dirname, 'assets', 'IconTemplate.png'),
  height: 400,
  width: 400
})

mb.on('ready', function ready () {
  console.log('app is ready')
})

mb.on('after-create-window', function () {
  if (process.env.NODE_ENV === 'development') {
    mb.window.openDevTools()
  }
  console.log('window is loaded')
})
