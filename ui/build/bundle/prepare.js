'use strict'

const flatten = require('gulp-flatten')
const rename = require('gulp-rename')

exports.fn = function (gulp, paths, argv, done) {
  return gulp.src(paths.src + './jspm.conf.js', { base: '.' })
    .pipe(flatten())
    .pipe(rename('app-bundle.conf.js'))
    .pipe(gulp.dest(paths.src))
}
