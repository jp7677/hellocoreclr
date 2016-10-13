'use strict'

const filenames = require('gulp-filenames')
const bundle = require('aurelia-bundler').bundle

exports.dep = ['bundle:tscompile', 'bundle:prepare']
exports.fn = function (gulp, paths, mode, done) {
  var configjs = filenames.get('configjs')

  return bundle({
    force: true,
    baseURL: paths.src,
    configPath: paths.src + configjs,
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
