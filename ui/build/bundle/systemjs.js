'use strict'

const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat')
const footer = require('gulp-footer')
const uglify = require('gulp-uglify')
const flatten = require('gulp-flatten')
const rev = require('gulp-rev')
const util = require('gulp-util')
const filenames = require('gulp-filenames')

exports.dep = ['bundle:app']
exports.fn = (gulp, paths, argv, done) => {
  // Import the systemjs polyfill to keep compatibility with Safari 7 and IE
  let systemjsFiles = [
    paths.src + 'jspm_packages/system-polyfills.js',
    paths.src + 'jspm_packages/system.js',
    paths.src + 'app-bundle.conf.js']

  return gulp.src(systemjsFiles, { base: '.' })
    .pipe(!argv.production ? sourcemaps.init({loadMaps: true}) : util.noop())
    .pipe(concat('app-bootstrap.js'))
    .pipe(footer('\nSystem.import(\'app/splash\').catch(console.error.bind(console));\nSystem.import(\'aurelia-bootstrapper\').catch(console.error.bind(console));'))
    .pipe(uglify({mangle: argv.production}))
    .pipe(flatten())
    .pipe(argv.production ? rev() : util.noop())
    .pipe(filenames('bootstrapjs'))
    .pipe(!argv.production ? sourcemaps.write('.', {
      mapSources: function (sourcePath) {
        return sourcePath.substr(sourcePath.indexOf('/') + 1)
      }
    }) : util.noop())
    .pipe(gulp.dest(paths.wwwroot))
}
