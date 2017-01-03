'use strict'

exports.fn = (gulp, paths, argv, done) => {
  return gulp.src(paths.jspmPackages + '**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(gulp.dest(paths.wwwroot + 'jspm_packages'))
}
