'use strict'

const bundle = require('aurelia-bundler').bundle

exports.dep = ['compile:ts', 'bundle:prepare']
exports.fn = (gulp, paths, argv, done) => {
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
          minify: argv.production,
          rev: argv.production,
          sourceMaps: !argv.production,
          sourceMapContents: !argv.production
        }
      },
      'app-bundle-settings': {
        includes: [
          './src/appsettings.json!json'
        ],
        options: {
          inject: true,
          minify: argv.production,
          rev: argv.production,
          sourceMaps: false
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
          'fetch',
          'jquery',
          'aurelia-binding',
          'aurelia-bootstrapper',
          'aurelia-dependency-injection',
          'aurelia-event-aggregator',
          'aurelia-fetch-client',
          'aurelia-framework',
          'aurelia-history',
          'aurelia-history-browser',
          'aurelia-loader',
          'aurelia-loader-default',
          'aurelia-logging',
          'aurelia-logging-console',
          'aurelia-metadata',
          'aurelia-pal',
          'aurelia-pal-browser',
          'aurelia-path',
          'aurelia-route-recognizer',
          'aurelia-router',
          'aurelia-task-queue',
          'aurelia-templating-binding',
          'aurelia-templating-resources',
          'aurelia-templating-router',
          'aurelia-validation',
          'toastr'
        ],
        options: {
          inject: true,
          minify: argv.production,
          rev: argv.production,
          sourceMaps: !argv.production,
          sourceMapContents: !argv.production
        }
      },
      'app-bundle-nm': {
        includes: [
          'bootstrap',
          'moment'
        ],
        options: {
          inject: true,
          minify: argv.production,
          mangle: false,
          rev: argv.production,
          sourceMaps: !argv.production,
          sourceMapContents: !argv.production
        }
      }
    }
  })
}
