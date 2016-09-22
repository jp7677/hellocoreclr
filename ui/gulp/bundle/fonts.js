'use strict'

const flatten = require('gulp-flatten')

exports.fn = function (gulp, paths, mode, done) {
  return gulp.src(paths.jspmPackages + '**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(flatten())
    .pipe(gulp.dest(paths.wwwroot + '/fonts'))
}
