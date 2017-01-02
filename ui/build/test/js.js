'use strict'

const path = require('path')

exports.dep = ['bundle:tscompile']
exports.fn = function (gulp, paths, mode, done) {
  var karma = require('karma').Server

  karma.start({
    configFile: path.join(__dirname, '..', '..', 'karma.conf.js')
  }, function (exitCode) {
    done()
    if (!mode.watch) {
      process.exit(exitCode)
    }
  })
}
