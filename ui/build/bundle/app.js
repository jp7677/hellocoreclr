'use strict'

const bundle = require('aurelia-bundler').bundle

exports.dep = ['bundle:tscompile', 'bundle:prepare']
exports.fn = function (gulp, paths, mode, done) {
  return bundle({
    force: true,
    baseURL: paths.src,
    configPath: paths.src + 'app-bundle.conf.js',
    bundles: {
      'app-bundle-splash': {
        includes: [
          '[./src/app/splash.js]',
          '[./src/app/statusbar.js]',
          'nprogress'
        ],
        options: {
          inject: true,
          minify: mode.production,
          rev: mode.production,
          sourceMaps: !mode.production,
          sourceMapContents: !mode.production
        }
      },
      'app-bundle': {
        includes: [
          '[./src/app/**/*.js]',
          './src/app/**/*.html!text',
          './src/styles/**/*.css!text',
          'font-awesome/css/font-awesome.css!text',
          'bootstrap/css/bootstrap.css!text',
          'bootstrap/css/bootstrap-theme.css!text',
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
