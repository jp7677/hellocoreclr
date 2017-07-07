'use strict'

const {argv, paths} = require('../../settings')
const del = require('del')

exports.fn = (gulp, done) => {
  return del(paths.wwwroot)
}
