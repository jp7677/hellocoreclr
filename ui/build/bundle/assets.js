'use strict'

const {argv, paths} = require('../../settings')

exports.fn = (gulp, done) => {
  return gulp.src([paths.src + '**/*.{ico,svg}', '!' + paths.jspmPackages])
    .pipe(gulp.dest(paths.wwwroot))
}

