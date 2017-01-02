'use strict'

const gulp = require('gulp')
const load = require('gulp-require-tasks')
const run = require('run-sequence')
const util = require('gulp-util')

const mode = { production: !!util.env.production }
const paths = {
  wwwroot: './wwwroot/',
  src: './src/',
  test: './test/',
  jspmPackages: './src/jspm_packages/**/*'
}

load({
  path: process.cwd() + '/build',
  arguments: [paths, mode]
})

gulp.task('lint', ['lint:ts', 'lint:css', 'lint:html'])

gulp.task('build', function (done) {
  run('clean:dest', ['lint', 'bundle:js', 'bundle:html', 'clean:bundle', 'bundle:image', 'bundle:assets', 'bundle:fonts'], done)
})

gulp.task('default', ['build'])

gulp.task('watch', ['watch:all'])

gulp.task('serve', ['serve:wwwroot'])

gulp.task('e2e-tests', function (done) {
  run('test:e2e', 'serve:stop', done)
})
