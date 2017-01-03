'use strict'

exports.fn = (gulp, paths, argv, done) => {
  const connect = require('gulp-connect')
  connect.serverClose()
  done()
}
