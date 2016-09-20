'use strict'

const gulp = require('gulp')
const load = require('gulp-require-tasks')
const run = require('run-sequence')

const paths = {
  wwwroot: './wwwroot/',
  src: './src/',
  test: './test/',
  jspmPackages: './src/jspm_packages/**/*'
}

var production = false

load({
  path: process.cwd() + '/gulp',
  arguments: [paths, production]
})

gulp.task('lint', ['lint:ts', 'lint:css', 'lint:html'])

gulp.task('build', function (done) {
  run('clean:dest', ['lint', 'bundle:app', 'bundle:html', 'bundle:image', 'bundle:assets', 'bundle:vendorassets'], done)
})

gulp.task('production', function (done) {
  production = true
  run('build', done)
})

gulp.task('default', ['build'])

gulp.task('watch', ['watch:all'])
