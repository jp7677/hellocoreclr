'use strict'

const path = require('path')
const childprocess = require('child_process')

exports.dep = ['serve:wwwroot']
exports.fn = (gulp, paths, argv, done) => {
  let args = ['protractor.conf.js']

  let winExt = /^win/.test(process.platform) ? '.cmd' : ''
  let nodeBinDir = path.join('node_modules', '.bin')
  let protractorBin = path.join(nodeBinDir, 'protractor' + winExt)

  let child = childprocess.spawn(protractorBin, args, {
    stdio: 'inherit'
  }).on('close', (code) => {
    if (child) {
      child.kill()
    }
    if (code !== 0) {
      process.exit(code)
    } else {
      done()
    }
  })
}
