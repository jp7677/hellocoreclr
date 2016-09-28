'use strict'

const jspm = require('gulp-jspm')
const sourcemaps = require('gulp-sourcemaps')
const filenames = require('gulp-filenames')
const flatten = require('gulp-flatten')
const hash = require('gulp-hash-filename')
const util = require('gulp-util')

exports.dep = ['bundle:tscompile']
exports.fn = function (gulp, paths, mode, done) {
  return gulp.src(paths.src + './app.js', { base: '.' })
    .pipe(!mode.production ? sourcemaps.init({loadMaps: true}) : util.noop())
    .pipe(jspm({selfExecutingBundle: true, minify: mode.production, mangle: mode.production, fileName: 'app-bundle'}))
    .pipe(mode.production ? hash({'format': '{hash}{ext}'}) : util.noop())
    .pipe(filenames('appbundle'))
    .pipe(!mode.production ? sourcemaps.write('.') : util.noop())
    .pipe(flatten())
    .pipe(gulp.dest('wwwroot'))
}
