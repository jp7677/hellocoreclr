'use strict'

const htmlreplace = require('gulp-html-replace')
const filenames = require('gulp-filenames')
const htmlmin = require('gulp-htmlmin')
const path = require('path')

exports.dep = ['bundle:app', 'bundle:css']
exports.fn = function (gulp, paths, mode, done) {
  var appbundle = filenames.get('appbundle')[0].substr(filenames.get('appbundle')[0].indexOf(path.sep) + 1)
  var cssbundle = filenames.get('cssbundle')[0].substr(filenames.get('cssbundle')[0].indexOf(path.sep) + 1)

  return gulp.src([paths.src + '**/*.html', '!' + paths.jspmPackages])
    .pipe(htmlreplace({
      'appbundle': appbundle,
      'cssbundle': cssbundle
    }))
    .pipe(htmlmin({
      collapseWhitespace: mode.production,
      removeComments: mode.production,
      sortAttributes: mode.production,
      sortClassName: mode.production
    }))
    .pipe(gulp.dest(paths.wwwroot))
}
