'use strict'

var gulp = require('gulp')
var rimraf = require('rimraf')
var concat = require('gulp-concat')
var cssmin = require('gulp-cssmin')
var uglify = require('gulp-uglify')

var paths = {
  webroot: './wwwroot/'
}

paths.js = paths.webroot + 'app/**/*.js'
paths.minJs = paths.webroot + 'app/**/*.min.js'
paths.css = paths.webroot + 'css/**/*.css'
paths.minCss = paths.webroot + 'css/**/*.min.css'
paths.concatJsDest = paths.webroot + 'app/site.min.js'
paths.concatCssDest = paths.webroot + 'css/site.min.css'

gulp.task('clean:js', function (cb) {
  rimraf(paths.concatJsDest, cb)
})

gulp.task('clean:css', function (cb) {
  rimraf(paths.concatCssDest, cb)
})

gulp.task('clean', ['clean:js', 'clean:css'])

gulp.task('min:js', function () {
  gulp.src([paths.js, '!' + paths.minJs], { base: '.' })
    .pipe(concat(paths.concatJsDest))
    .pipe(uglify())
    .pipe(gulp.dest('.'))
})

gulp.task('min:css', function () {
  gulp.src([paths.css, '!' + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest('.'))
})

gulp.task('min', ['min:js', 'min:css'])
