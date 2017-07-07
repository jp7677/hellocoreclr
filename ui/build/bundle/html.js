'use strict'

const {argv, paths} = require('../../settings')
const htmlreplace = require('gulp-html-replace')
const filenames = require('gulp-filenames')
const htmlmin = require('gulp-htmlmin')

exports.deps = ['bundle:systemjs']
exports.fn = (gulp, done) => {
  let bootstrapjs = filenames.get('bootstrapjs')

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
