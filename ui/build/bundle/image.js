'use strict'

const image = require('gulp-imagemin')

exports.fn = function (gulp, paths, argv, done) {
  return gulp.src([paths.src + '**/*.{png,jpg,gif}', '!' + paths.jspmPackages])
  .pipe(image())
  .pipe(gulp.dest(paths.wwwroot))
}
