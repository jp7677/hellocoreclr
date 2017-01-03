'use strict'

const path = require('path')

exports.fn = function (gulp, paths, mode, done) {
  var argv = require('yargs').argv
  var karma = require('karma').Server

  let reporters = argv.karmareporters === undefined
    ? ['mocha', 'coverage', 'remap-coverage']
    : argv.karmareporters

  karma.start({
    configFile: path.join(__dirname, '..', '..', 'karma.conf.js'),
    reporters: reporters
  }, function (exitCode) {
    done()
    if (!mode.watch) {
      process.exit(exitCode)
    }
  })
}
