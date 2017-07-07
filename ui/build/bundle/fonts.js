'use strict'

const {argv, paths} = require('../../settings')

exports.fn = (gulp, done) => {
  return gulp.src(paths.jspmPackages + '**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest(paths.wwwroot + 'jspm_packages'))
}
