'use strict'

var gulp = require('gulp')
var rimraf = require('gulp-rimraf')
var tslint = require('gulp-tslint')
var ts = require('gulp-typescript')
var sourcemaps = require('gulp-sourcemaps')
var concat = require('gulp-concat')
var cssmin = require('gulp-cssmin')
var uglify = require('gulp-uglify')

var paths = {
  webroot: './wwwroot/'
}

paths.ts = paths.webroot + '**/*.ts'
paths.js = paths.webroot + 'app/**/*.js'
paths.jsMap = paths.webroot + 'app/**/*.js.map'
paths.specJs = paths.webroot + 'test/**/*.js'
paths.specJsMap = paths.webroot + 'test/**/*.js.map'
paths.minJs = paths.webroot + 'app/**/*.min.js'
paths.css = paths.webroot + 'css/**/*.css'
paths.minCss = paths.webroot + 'css/**/*.min.css'
paths.concatJsDest = paths.webroot + 'app/site.min.js'
paths.concatCssDest = paths.webroot + 'css/site.min.css'

var tsProject = ts.createProject('tsconfig.json')

gulp.task('clean:js', function (cb) {
  return gulp.src([paths.js, paths.minJs, paths.jsMap, paths.specJs, paths.specJsMap], { read: false })
    .pipe(rimraf())
})

gulp.task('clean:css', function (cb) {
  return gulp.src(paths.concatCssDest, { read: false })
    .pipe(rimraf())
})

gulp.task('clean', ['clean:js', 'clean:css'])

gulp.task('tslint', function (cb) {
  return gulp.src(paths.ts)
    .pipe(tslint())
    .pipe(tslint.report('verbose'))
})

gulp.task('tscompile', ['tslint'], function (cb) {
  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))

  return tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.webroot))
})

gulp.task('min:js', ['clean:js', 'tscompile'], function () {
  gulp.src([paths.js, '!' + paths.minJs], { base: '.' })
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat(paths.concatJsDest))
    .pipe(sourcemaps.write())
    .pipe(sourcemaps.init({loadMaps: true}))
    // Note that compress: true and mangle: true gives you uglier code,
    // but makes debugging in the browser debugger more difficult.
    .pipe(uglify({compress: false, mangle: false}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'))
})

gulp.task('min:css', ['clean:css'], function () {
  gulp.src([paths.css, '!' + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest('.'))
})

gulp.task('min', ['min:js', 'min:css'])

gulp.task('build', ['min'])

gulp.task('default', ['build'])
