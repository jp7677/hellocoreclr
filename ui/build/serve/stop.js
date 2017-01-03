'use strict'

exports.fn = function (gulp, paths, argv, done) {
  var connect = require('gulp-connect')
  connect.serverClose()
  done()
}
