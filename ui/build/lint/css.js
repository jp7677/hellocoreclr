'use strict'

const util = require('gulp-util')
const path = require('path')

exports.fn = (gulp, paths, argv, done) => {
  if (argv.production) {
    util.log('Skipping \'' + util.colors.cyan('gulp-stylelint') + '\'')
    done()
    return
  }

  const consoleFormatter = (results) => {
    results.forEach((element) => {
      let file = path.relative(path.join(process.cwd(), paths.src), element.source)
      element.warnings.forEach((warning) => {
        let message = '[' + util.colors.cyan('lint') + '] ' +
          util.colors.red(warning.severity) + ' ' + file +
          '[' + warning.line + ', ' + warning.column + ']: ' + warning.text
        util.log(message)
      })
    })
  }

  const stylelint = require('gulp-stylelint')
  return gulp.src([paths.src + '**/*.css', '!' + paths.jspmPackages])
    .pipe(stylelint({
      failAfterError: false,
      reporters: [
        {formatter: consoleFormatter}
      ]
    }))
}
