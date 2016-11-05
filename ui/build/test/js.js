'use strict'

const path = require('path')

exports.dep = ['bundle:tscompile']
exports.fn = function (gulp, paths, mode, done) {
  var karma = require('karma').Server

  karma.start({
    configFile: path.join(__dirname, '..', '..', 'karma.conf.js'),
    singleRun: true
  }, function (exitCode) {
    // We are supposed to run i.c.w. watch/browsersync.
    // So regardless of the karma exit code we just tell gulp
    // that the test run finished sucessfully. In a CI scenario
    // you would obviously propagate the exit code to gulp for
    // letting the CI pipeline know that tests have failed.
    done()
  })
}
