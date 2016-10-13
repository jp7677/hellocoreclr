'use strict'

const unbundle = require('aurelia-bundler').unbundle

exports.dep = ['bundle:app']
exports.fn = function (gulp, paths, mode, done) {
  return unbundle({
    baseURL: './src',
    configPath: './src/jspm.conf.js'
  })
}
