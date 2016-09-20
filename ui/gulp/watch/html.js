'use strict'

module.exports = {
  fn: function (gulp, paths, mode, done) {
    var watch = require('gulp-watch')
    var batch = require('gulp-batch')

    watch([paths.src + '**/*.html', '!' + paths.jspmPackages], batch(function (events, done) {
      gulp.start('lint:html', done)
      done()
    }))
  }
}
