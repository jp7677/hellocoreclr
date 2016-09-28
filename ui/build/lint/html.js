'use strict'

const util = require('gulp-util')
const path = require('path')

exports.fn = function (gulp, paths, mode, done) {
  if (mode.production) {
    util.log('Skipping \'' + util.colors.cyan('gulp-htmlhint') + '\'')
    done()
    return
  }

  var consoleReporter = function (results) {
    results.htmlhint.messages.forEach(function (warning) {
      var file = path.relative(path.join(process.cwd(), paths.src), warning.file)
      var message = '[' + util.colors.cyan('lint') + '] ' +
        util.colors.red(warning.error.type) + ' ' + file +
        '[' + warning.error.line + ', ' + warning.error.col + ']: ' + warning.error.message
      util.log(message)
    })
  }

  var htmlhint = require('gulp-htmlhint')
  return gulp.src([paths.src + '**/*.html', '!' + paths.jspmPackages])
    .pipe(htmlhint())
    .pipe(htmlhint.reporter(consoleReporter))
}
