'use strict'

const {argv, paths} = require('./settings')
const gulp = require('gulp')
const load = require('gulp-require-tasks')
const run = require('run-sequence')

load({
  path: process.cwd() + '/build',
})

gulp.task('lint', ['lint:ts', 'lint:css', 'lint:html'])

gulp.task('compile', ['compile:ts', 'compile:e2e'])

gulp.task('build', (done) => {
  run('clean:dest', ['lint', 'compile', 'bundle:js', 'bundle:html', 'clean:bundle', 'bundle:image', 'bundle:assets', 'bundle:fonts'], done)
})

gulp.task('default', ['build'])

gulp.task('watch', (done) => {
  run('watch:all', done)
})

gulp.task('unit-tests', (done) => {
  if (!argv.nobuild) {
    run('compile:ts', 'test:js', done)
  } else {
    run('test:js', done)
  }
})

gulp.task('e2e-tests', (done) => {
  if (!argv.nobuild) {
    run('build', 'test:e2e', 'serve:stop', done)
  } else {
    run('test:e2e', 'serve:stop', done)
  }
})

gulp.task('serve', ['serve:wwwroot'])
