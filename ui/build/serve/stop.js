'use strict'

exports.fn = (gulp, done) => {
  const connect = require('gulp-connect')
  connect.serverClose()
  done()
}
