'use strict'

const {argv, paths} = require('../../settings')

exports.fn = (gulp, done) => {
  const browserSync = require('browser-sync').get('server')

  return gulp.src([paths.src + '**/*.css', '!' + paths.jspmPackages])
    .pipe(browserSync.stream())
}
