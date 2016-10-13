'use strict'

const flatten = require('gulp-flatten')
const rename = require('gulp-rename')
const rev = require('gulp-rev')
const util = require('gulp-util')
const filenames = require('gulp-filenames')

exports.fn = function (gulp, paths, mode, done) {
  return gulp.src(paths.src + './jspm.conf.js', { base: '.' })
    .pipe(flatten())
    .pipe(rename('app-bundle.conf.js'))
    .pipe(mode.production ? rev() : util.noop())
    .pipe(filenames('configjs'))
    .pipe(gulp.dest(paths.src))
}
