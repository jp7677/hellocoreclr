'use strict'

module.exports = {
  fn: function (gulp, paths, mode, done) {
    var watch = require('gulp-watch')
    var batch = require('gulp-batch')

    watch([paths.src + '**/*.ts', '!' + paths.jspmPackages], batch(function (events, done) {
      gulp.start('lint:ts', done)
      gulp.start('tscompile', done)
      done()
    }))
  }
}
