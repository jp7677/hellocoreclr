'use strict'

const flatten = require('gulp-flatten')

exports.dep = ['bundle:app']
exports.fn = function (gulp, paths, mode, done) {
  var files = [paths.src + './jspm_packages/system.js', paths.src + './app-bundle*.js']
  if (!mode.production) {
    files.push(paths.src + './jspm_packages/system.js.map')
    files.push(paths.src + './jspm_packages/system.src.js')
  }

  return gulp.src(files, { base: '.' })
  .pipe(flatten())
  .pipe(gulp.dest(paths.wwwroot))
}
