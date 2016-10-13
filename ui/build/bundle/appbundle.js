'use strict'

const bundle = require('aurelia-bundler').bundle

exports.dep = ['bundle:tscompile']
exports.fn = function (gulp, paths, mode, done) {
  return bundle({
    force: true,
    baseURL: './src',
    configPath: './src/jspm.conf.js',
    bundles: {
      'app-bundle': {
        includes: [
          '[./src/main.js]',
          '[./src/app/**/*.js]',
          'aurelia-framework',
          'aurelia-bootstrapper',
          'aurelia-loader-default',
          'aurelia-fetch-client',
          'aurelia-router',
          'aurelia-logging-console',
          'aurelia-templating-binding',
          'aurelia-templating-resources',
          'aurelia-history-browser',
          'aurelia-templating-router',
          'toastr'
        ],
        options: {
          inject: true,
          minify: mode.production,
          rev: mode.production,
          sourceMaps: !mode.production
        }
      }
    }
  })
}