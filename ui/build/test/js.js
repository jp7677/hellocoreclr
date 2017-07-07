'use strict'

const {argv, paths} = require('../../settings')
const path = require('path')

exports.fn = (gulp, done) => {
  const karma = require('karma').Server

  karma.start({
    configFile: path.join(__dirname, '..', '..', 'karma.conf.js'),
    reporters: argv.karmareporters
  }, (exitCode) => {
    done()
    if (!argv._.includes('watch')) {
      process.exit(exitCode)
    }
  })
}
