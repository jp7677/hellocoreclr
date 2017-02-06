'use strict'

const util = require('gulp-util')
const path = require('path')

exports.fn = (gulp, paths, argv, done) => {
  if (argv.production) {
    util.log('Skipping \'' + util.colors.cyan('lint:html') + '\'')
    done()
    return
  }

  const consoleReporter = (results) => {
    results.htmlhint.messages.forEach((warning) => {
      let file = path.relative(path.join(process.cwd(), paths.src), warning.file)
      let message = '[' + util.colors.cyan('lint') + '] ' +
        util.colors.red(warning.error.type) + ' ' + file +
        '[' + warning.error.line + ', ' + warning.error.col + ']: ' + warning.error.message
      util.log(message)
    })
  }

  const htmlhint = require('gulp-htmlhint')
  return gulp.src([paths.src + '**/*.html', '!' + paths.jspmPackages])
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.reporter(consoleReporter))
}
