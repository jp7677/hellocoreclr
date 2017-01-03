'use strict'

exports.fn = (gulp, paths, argv, done) => {
  const browserSync = require('browser-sync').get('server')

  browserSync.reload()
  done()
}
