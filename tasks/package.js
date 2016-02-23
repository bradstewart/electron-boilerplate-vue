// WIP - A lot of this will be unnecessary with the update to electron-builder 
// 
/**
 * Packages the application into executable .app and .exe files.
 *
 * The only potential "gotcha" going forward is the "ignore" array in the 
 * config object. We basically want to exclude everything that isn't required by
 * the application to run once distributed. 
 *
 * We can exclude all of /app and a lot of NPM modules because it's webpack'ed into dist,
 * but make sure any "externals" or dependencies of "main.js" are in "dependencies" and not
 * "devDependencies".
 */

'use strict'

const os = require('os')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))
const packager = require('electron-packager')
const del = require('del')

const manifest = require('../package.json')
const platform = argv.platform || os.platform() 

const config = {
  all : true,
  dir           : path.join(__dirname,'../dist'),
  name          : manifest.productName,
  'app-version' : manifest.version,
  version       : manifest.devDependencies['electron-prebuilt'].replace(/^\D+/, ''),
  prune         : true,
  platform      : platform,
  ignore        : [
    '/test($|/)',
    '/tools($|/)',
    '/releases($|/)',
    '/build($|/)',
    '/app($|/)',
    '/env($|/)'
  ].concat(
    Object.keys(manifest.devDependencies).map((name) => {
      return `/node_modules/${name}($|/)`
    })
  ),
}

log(`Starting packager...`)

if (platform === 'darwin') {
  Object.assign(config, {
    out  : 'releases/osx',
    icon : 'build/assets/osx/icon.icns',
    arch : argv.arch || 'x64'
  })
} else if (platform === 'win32') {
  Object.assign(config, {
    out  : 'releases/windows',
    icon : 'build/assets/windows/icon.ico',
    arch : argv.arch || 'x64',
  })
} else {
  throw new Error(`${platform} is unsupported.`)
}


del(config.out)
  .then((paths) => {
    pack()
  })
  .catch((err) => {
    error(err)
  })

function pack () {
  packager(config, (err, appPath) => {
    if (err) {
      error(err)
      process.exit(1)
    }

    log(`Packaged to ${appPath}`)
  })
}

function log (content, operation) {
  let op = operation || platform
  console.log(`\x1b[35mbuild \x1b[33m${op}\x1b[0m ${content}`)
}

function error (content) {
  console.error(`\x1b[35mbuild \x1b[31mERR!\x1b[0m ${content}`)
}
