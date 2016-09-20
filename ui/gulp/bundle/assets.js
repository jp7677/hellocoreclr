'use strict'

module.exports = {
  fn: function (gulp, paths, mode, done) {
    return gulp.src([paths.src + '**/*.ico', '!' + paths.jspmPackages])
      .pipe(gulp.dest(paths.wwwroot))
  }
}
