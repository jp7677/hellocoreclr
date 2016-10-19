'use strict'

const bundle = require('aurelia-bundler').bundle

exports.dep = ['bundle:tscompile', 'bundle:prepare']
exports.fn = function (gulp, paths, mode, done) {
  return bundle({
    force: true,
    baseURL: paths.src,
    configPath: paths.src + 'app-bundle.conf.js',
    bundles: {
      'app-bundle': {
        includes: [
          '[./src/main.js]',
          '[./src/app/**/*.js]',
          './src/styles/**/*.css!text',
          './src/app/**/*.html!text',
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
          sourceMaps: !mode.production,
          sourceMapContents: !mode.production
        }
      }
    }
  })
}
