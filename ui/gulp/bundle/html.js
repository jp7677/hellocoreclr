'use strict'

const htmlreplace = require('gulp-html-replace')
const filenames = require('gulp-filenames')
const htmlmin = require('gulp-htmlmin')

module.exports = {
  dep: ['bundle:app'],
  fn: function (gulp, paths, mode, done) {
    var appbundle = filenames.get('appbundle')[0].substr(filenames.get('appbundle')[0].indexOf('/') + 1)

    return gulp.src([paths.src + '**/*.html', '!' + paths.jspmPackages])
      .pipe(htmlreplace({
        'appbundle': appbundle
      }))
      .pipe(htmlmin({
        collapseWhitespace: mode.production,
        removeComments: mode.production,
        sortAttributes: mode.production,
        sortClassName: mode.production
      }))
      .pipe(gulp.dest(paths.wwwroot))
  }
}
