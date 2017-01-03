'use strict'

exports.dep = ['bundle:tscompile']
exports.fn = (gulp, paths, argv, done) => {
  const browserSync = require('browser-sync').get('server')

  return gulp.src([paths.src + '**/*.js', '!' + paths.jspmPackages])
    .pipe(browserSync.stream())
}
