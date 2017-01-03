'use strict'

const util = require('gulp-util')
const path = require('path')

exports.fn = (gulp, paths, argv, done) => {
  if (argv.production) {
    util.log('Skipping \'' + util.colors.cyan('gulp-stylelint') + '\'')
    done()
    return
  }

  var consoleFormatter = (results) => {
    results.forEach((element) => {
      var file = path.relative(path.join(process.cwd(), paths.src), element.source)
      element.warnings.forEach((warning) => {
        var message = '[' + util.colors.cyan('lint') + '] ' +
          util.colors.red(warning.severity) + ' ' + file +
          '[' + warning.line + ', ' + warning.column + ']: ' + warning.text
        util.log(message)
      })
    })
  }

  var stylelint = require('gulp-stylelint')
  return gulp.src([paths.src + '**/*.css', '!' + paths.jspmPackages])
    .pipe(stylelint({
      failAfterError: false,
      reporters: [
        {formatter: consoleFormatter}
      ]
    }))
}
