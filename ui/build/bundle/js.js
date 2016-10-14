'use strict'

const flatten = require('gulp-flatten')

exports.dep = ['bundle:app']
exports.fn = function (gulp, paths, mode, done) {
  return gulp.src([paths.src + 'app-bundle*.js', '!' + paths.src + 'app-bundle.conf.js'], { base: '.' })
  .pipe(flatten())
  .pipe(gulp.dest(paths.wwwroot))
}
