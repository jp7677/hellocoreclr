'use strict'

const image = require('gulp-image-optimization')

module.exports = {
  fn: function (gulp, paths, production, done) {
    return gulp.src([paths.src + '**/*.{png,jpg,gif,svg}', '!' + paths.jspmPackages])
    .pipe(image({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(paths.wwwroot))
  }
}
