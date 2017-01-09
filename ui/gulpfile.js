'use strict'

const gulp = require('gulp')
const argv = require('yargs')
  .default('production', false)
  .default('nobuild', false)
  .default('nomiddlewareproxy', false)
  .default('karmareporters', ['mocha', 'coverage', 'remap-coverage'])
  .argv
const load = require('gulp-require-tasks')
const run = require('run-sequence')

const paths = {
  wwwroot: './wwwroot/',
  src: './src/',
  test: './test/',
  jspmPackages: './src/jspm_packages/**/*'
}

load({
  path: process.cwd() + '/build',
  arguments: [paths, argv]
})

gulp.task('lint', ['lint:ts', 'lint:css', 'lint:html'])

gulp.task('build', (done) => {
  run('clean:dest', ['lint', 'bundle:js', 'bundle:html', 'clean:bundle', 'bundle:image', 'bundle:assets', 'bundle:fonts'], done)
})

gulp.task('default', ['build'])

gulp.task('watch', (done) => {
  run('watch:all', done)
})

gulp.task('unit-tests', (done) => {
  if (!argv.nobuild) {
    run('bundle:tscompile', 'test:js', done)
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
