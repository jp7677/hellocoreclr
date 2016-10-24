'use strict'

const htmlreplace = require('gulp-html-replace')
const filenames = require('gulp-filenames')
const htmlmin = require('gulp-htmlmin')

exports.dep = ['bundle:systemjs']
exports.fn = function (gulp, paths, mode, done) {
  var bootstrapjs = filenames.get('bootstrapjs')

  return gulp.src(paths.src + 'index.html')
    .pipe(htmlreplace({
      'bootstrapjs': bootstrapjs
    }))
    .pipe(htmlmin({
      collapseWhitespace: mode.production,
      removeComments: mode.production,
      sortAttributes: mode.production,
      sortClassName: mode.production
    }))
    .pipe(gulp.dest(paths.wwwroot))
}
