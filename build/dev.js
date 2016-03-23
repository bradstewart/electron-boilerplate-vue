/**
 * Runs both the express dev server and the electron client with
 * a single command. When one process exits, all processes exit.
 * Stdout and stderr from both processes is logged to the same console.
 */
var exec = require('child_process').exec

var GREEN = '\x1b[32m'
var BLUE  = '\x1b[34m'
var END   = '\x1b[0m'

function format (command, data, color) {
  return color + command + END 
    + '  ' // Two space offset
    + data.trim().replace(/\n/g, '\n' + repeat(' ', command.length+2)) 
    + '\n'
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function run (command, color) {
  var child = exec('npm run ' + command)

  child.stdout.on('data', function (data) {
    console.log(format(command, data, color))
  })

  child.stderr.on('data', function (data) {
    console.error(format(command, data, color))
  })

  child.on('close', function (code) { 
    process.exit(code)
  })
}

// Run the client and the server
run('dev:server', GREEN)
run('dev:client', BLUE)
