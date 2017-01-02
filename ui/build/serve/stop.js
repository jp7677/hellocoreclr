'use strict'

exports.fn = function (gulp, paths, mode, done) {
  var connect = require('gulp-connect')
  connect.serverClose()
  done()
}
