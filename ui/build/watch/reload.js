'use strict'

const {argv, paths} = require('../../settings')

exports.fn = (gulp, done) => {
  const browserSync = require('browser-sync').get('server')

  browserSync.reload()
  done()
}
