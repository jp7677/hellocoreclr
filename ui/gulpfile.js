'use strict'

const gulp = require('gulp')
const load = require('gulp-require-tasks')
const run = require('run-sequence')

const mode = { production: false }
const paths = {
  wwwroot: './wwwroot/',
  src: './src/',
  test: './test/',
  jspmPackages: './src/jspm_packages/**/*'
}

load({
  path: process.cwd() + '/gulp',
  arguments: [paths, mode]
})

gulp.task('lint', ['lint:ts', 'lint:css', 'lint:html'])

gulp.task('build', function (done) {
  run('clean:dest', ['lint', 'bundle:app', 'bundle:css', 'bundle:html', 'bundle:image', 'bundle:assets', 'bundle:fonts'], done)
})

gulp.task('production', function (done) {
  mode.production = true
  run('build', done)
})

gulp.task('default', ['build'])

gulp.task('watch', ['watch:all'])
