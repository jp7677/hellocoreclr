'use strict'

const util = require('gulp-util')

exports.fn = function (gulp, paths, mode, done) {
  if (mode.production) {
    util.log('Skipping \'' + util.colors.cyan('gulp-tslint') + '\'')
    done()
    return
  }

  var consoleFormatter = function () {
    consoleFormatter.prototype.format = function (results) {
      var now = new Date()
      var message = ''
      results.forEach(function (element) {
        var line = '[' + util.colors.cyan('lint') + '] ' +
          util.colors.red('error') + ' ' + element.fileName +
          '[' + (element.startPosition.lineAndCharacter.line + 1) + ', ' + (element.startPosition.lineAndCharacter.character + 1) + ']: ' +
          element.failure
        message += '[' + util.colors.gray(now.toLocaleTimeString([], {hour12: false})) + '] ' + line + '\n'
      })
      return message.trim()
    }
  }

  var tslint = require('gulp-tslint')
  return gulp.src([paths.src + '**/*.ts', paths.test + '**/*.ts', '!' + paths.jspmPackages])
    .pipe(tslint({formatter: consoleFormatter}))
    .pipe(tslint.report({emitError: false}))
}
