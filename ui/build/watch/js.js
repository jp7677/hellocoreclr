'use strict'

const {argv, paths} = require('../../settings')

exports.deps = ['compile:ts']
exports.fn = (gulp, done) => {
  const browserSync = require('browser-sync').get('server')

  return gulp.src([paths.src + '**/*.js', '!' + paths.jspmPackages])
    .pipe(browserSync.stream())
}
