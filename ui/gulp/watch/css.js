'use strict'

exports.fn = function (gulp, paths, mode, done) {
  var watch = require('gulp-watch')
  var batch = require('gulp-batch')

  watch([paths.src + '**/*.css', '!' + paths.jspmPackages], batch(function (events, done) {
    gulp.start('lint:css', done)
    done()
  }))
}
