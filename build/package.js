/**
 * Packages the application into executable .app and .exe files.
 * For more info, see https://github.com/electron-userland/electron-packager.
 */
var path = require('path')
var argv = require('minimist')(process.argv.slice(2))
var packager = require('electron-packager')
var appManifest = require('../app/package.json')
var devManifest = require('../package.json')

var config = {
  dir: path.join(__dirname, '../dist'),
  out: 'releases/',
  name: appManifest.productName,
  'app-version': appManifest.version,
  version: argv.version || devManifest.devDependencies['electron-prebuilt'].replace(/^\D+/, ''),
  platform: argv.platform || 'all',
  arch: argv.arch || 'all',
  prune: true,
  overwrite: true,
  ignore: Object.keys(appManifest.devDependencies).map(function (name) {
    return '/node_modules/' + name + '($|/)'
  })
}

packager(config, function (err, appPath) {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log('packaged to ' + appPath)
})
