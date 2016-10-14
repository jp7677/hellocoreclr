'use strict'

const htmlreplace = require('gulp-html-replace')
const filenames = require('gulp-filenames')
const htmlmin = require('gulp-htmlmin')
const path = require('path')

exports.dep = ['bundle:systemjs', 'bundle:css']
exports.fn = function (gulp, paths, mode, done) {
  var cssbundle = filenames.get('cssbundle')[0].substr(filenames.get('cssbundle')[0].indexOf(path.sep) + 1)
  var bootstrapjs = filenames.get('bootstrapjs')

  return gulp.src([paths.src + '**/*.html', '!' + paths.jspmPackages])
    .pipe(htmlreplace({
      'cssbundle': cssbundle,
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
