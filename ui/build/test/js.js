'use strict'

const path = require('path')

exports.fn = function (gulp, paths, mode, done) {
  var karma = require('karma').Server

  karma.start({
    configFile: path.join(__dirname, '..', '..', 'karma.conf.js'),
    reporters: mode.reporters
  }, function (exitCode) {
    done()
    if (!mode.watch) {
      process.exit(exitCode)
    }
  })
}
