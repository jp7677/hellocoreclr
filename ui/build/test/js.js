'use strict'

const path = require('path')

exports.fn = function (gulp, paths, argv, done) {
  var karma = require('karma').Server

  karma.start({
    configFile: path.join(__dirname, '..', '..', 'karma.conf.js'),
    reporters: argv.karmareporters
  }, function (exitCode) {
    done()
    if (!argv._.includes('watch')) {
      process.exit(exitCode)
    }
  })
}
