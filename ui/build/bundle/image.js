'use strict'

const {argv, paths} = require('../../settings')
const image = require('gulp-imagemin')

exports.fn = (gulp, done) => {
  return gulp.src([paths.src + '**/*.{png,jpg,gif}', '!' + paths.jspmPackages])
  .pipe(image())
  .pipe(gulp.dest(paths.wwwroot))
}
