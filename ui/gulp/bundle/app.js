'use strict'

const iif = require('gulp-if')
const jspm = require('gulp-jspm')
const sourcemaps = require('gulp-sourcemaps')
const filenames = require('gulp-filenames')
const flatten = require('gulp-flatten')
const hash = require('gulp-hash-filename')

module.exports = {
  dep: ['bundle:tscompile'],
  fn: function (gulp, paths, mode, done) {
    return gulp.src(paths.src + './app.js', { base: '.' })
      .pipe(iif(!mode.production, sourcemaps.init({loadMaps: true})))
      .pipe(jspm({selfExecutingBundle: true, minify: true, fileName: 'app-bundle'}))
      .pipe(iif(mode.production, hash({'format': '{hash}{ext}'})))
      .pipe(filenames('appbundle'))
      .pipe(iif(!mode.production, sourcemaps.write('.')))
      .pipe(flatten())
      .pipe(gulp.dest('wwwroot/'))
  }
}
