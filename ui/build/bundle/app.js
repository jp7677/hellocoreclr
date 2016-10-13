'use strict'

const flatten = require('gulp-flatten')

exports.dep = ['bundle:appbundle']
exports.fn = function (gulp, paths, mode, done) {
  return gulp.src([paths.src + './jspm_packages/system.js', paths.src + './jspm.conf.js', paths.src + './app-bundle*.js'], { base: '.' })
  .pipe(flatten())
  .pipe(gulp.dest('wwwroot'))
}
