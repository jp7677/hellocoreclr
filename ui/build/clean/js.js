'use strict'

const {argv, paths} = require('../../settings')
const del = require('del')

exports.fn = (gulp, done) => {
  return del([paths.src + '**/*.{js,js.map}',
    '!' + paths.src + 'jspm.conf.js',
    '!' + paths.src + 'app-bundle*.js',
    paths.test + '**/*.{js,js.map}',
    '!' + paths.jspmPackages])
}
