'use strict'

const htmlreplace = require('gulp-html-replace')
const filenames = require('gulp-filenames')
const htmlmin = require('gulp-htmlmin')

exports.dep = ['bundle:systemjs']
exports.fn = (gulp, paths, argv, done) => {
  var bootstrapjs = filenames.get('bootstrapjs')

  return gulp.src(paths.src + 'index.html')
    .pipe(htmlreplace({
      'bootstrapjs': bootstrapjs
    }))
    .pipe(htmlmin({
      collapseWhitespace: argv.production,
      removeComments: argv.production,
      sortAttributes: argv.production,
      sortClassName: argv.production
    }))
    .pipe(gulp.dest(paths.wwwroot))
}
