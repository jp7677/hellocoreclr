'use strict'

exports.fn = function (gulp, paths, mode, done) {
  var browserSync = require('browser-sync').get('server')
  browserSync.reload()
  done()
}
