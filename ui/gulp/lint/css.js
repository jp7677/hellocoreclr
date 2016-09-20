var util = require('gulp-util')
'use strict'

var path = require('path')

module.exports = {
  fn: function (gulp, paths, mode, done) {
    if (mode.production) {
      util.log('Skipping \'' + util.colors.cyan('gulp-stylelint') + '\'')
      done()
      return
    }

    var consoleFormatter = function (results) {
      results.forEach(function (element) {
        var file = path.relative(path.join(process.cwd(), paths.src), element.source)
        element.warnings.forEach(function (warning) {
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
}
