'use strict'

exports.fn = function (gulp, paths, mode, done) {
  var browserSync = require('browser-sync').get('server')
  return gulp.src([paths.src + '**/*.css', '!' + paths.jspmPackages])
    .pipe(browserSync.stream())
}
