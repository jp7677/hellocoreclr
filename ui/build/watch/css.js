'use strict'

exports.fn = (gulp, paths, argv, done) => {
  var browserSync = require('browser-sync').get('server')

  return gulp.src([paths.src + '**/*.css', '!' + paths.jspmPackages])
    .pipe(browserSync.stream())
}
