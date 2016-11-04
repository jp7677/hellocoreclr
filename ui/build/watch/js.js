'use strict'

exports.dep = ['bundle:tscompile']
exports.fn = function (gulp, paths, mode, done) {
  var browserSync = require('browser-sync').get('server')

  return gulp.src([paths.src + '**/*.js', '!' + paths.jspmPackages])
    .pipe(browserSync.stream())
}
