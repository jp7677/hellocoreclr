'use strict'

exports.fn = function (gulp, paths, argv, done) {
  var browserSync = require('browser-sync').get('server')

  browserSync.reload()
  done()
}
