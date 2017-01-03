'use strict'

const util = require('gulp-util')
const path = require('path')

exports.fn = (gulp, paths, argv, done) => {
  if (argv.production) {
    util.log('Skipping \'' + util.colors.cyan('gulp-htmlhint') + '\'')
    done()
    return
  }

  var consoleReporter = (results) => {
    results.htmlhint.messages.forEach((warning) => {
      var file = path.relative(path.join(process.cwd(), paths.src), warning.file)
      var message = '[' + util.colors.cyan('lint') + '] ' +
        util.colors.red(warning.error.type) + ' ' + file +
        '[' + warning.error.line + ', ' + warning.error.col + ']: ' + warning.error.message
      util.log(message)
    })
  }

  var htmlhint = require('gulp-htmlhint')
  return gulp.src([paths.src + '**/*.html', '!' + paths.jspmPackages])
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter(consoleReporter))
}
