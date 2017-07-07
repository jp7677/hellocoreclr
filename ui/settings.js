'use strict'

exports.argv = require('yargs')
  .default('production', false)
  .default('nobuild', false)
  .default('nomiddlewareproxy', false)
  .default('karmareporters', ['mocha', 'coverage', 'remap-coverage'])
  .argv

exports.paths = {
  wwwroot: './wwwroot/',
  src: './src/',
  test: './test/',
  testE2e: './test-e2e/',
  jspmPackages: './src/jspm_packages/**/*'
}
