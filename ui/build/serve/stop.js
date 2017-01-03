'use strict'

exports.fn = (gulp, paths, argv, done) => {
  var connect = require('gulp-connect')
  connect.serverClose()
  done()
}
