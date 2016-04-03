'use strict'

var gulp = require('gulp')
var tslint = require('gulp-tslint')
var ts = require('gulp-typescript')
var tsProject = ts.createProject('tsconfig.json')
var rimraf = require('gulp-rimraf')
var concat = require('gulp-concat')
var cssmin = require('gulp-cssmin')
var uglify = require('gulp-uglify')

var paths = {
  webroot: './wwwroot/'
}

paths.ts = paths.webroot + '/**/*.ts'
paths.js = paths.webroot + 'app/**/*.js'
paths.specJs = paths.webroot + 'test/**/*.js'
paths.minJs = paths.webroot + 'app/**/*.min.js'
paths.css = paths.webroot + 'css/**/*.css'
paths.minCss = paths.webroot + 'css/**/*.min.css'
paths.concatJsDest = paths.webroot + 'app/site.min.js'
paths.concatCssDest = paths.webroot + 'css/site.min.css'

gulp.task('tslint', function (cb) {
  return gulp.src(paths.ts)
    .pipe(tslint())
    .pipe(tslint.report('verbose'))
})

gulp.task('tscompile', ['tslint'], function (cb) {
  return gulp.src(paths.ts)
    .pipe(ts(tsProject))
    .pipe(gulp.dest(paths.webroot))
})

gulp.task('clean:js', function (cb) {
  return gulp.src([paths.js, paths.minJs, paths.specJs], { read: false })
    .pipe(rimraf())
})

gulp.task('clean:css', function (cb) {
  return gulp.src(paths.concatCssDest, { read: false })
    .pipe(rimraf())
})

gulp.task('clean', ['clean:js', 'clean:css'])

gulp.task('min:js', ['clean:js', 'tscompile'], function () {
  gulp.src([paths.js, '!' + paths.minJs], { base: '.' })
    .pipe(concat(paths.concatJsDest))
    .pipe(uglify())
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
