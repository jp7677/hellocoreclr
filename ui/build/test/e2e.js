'use strict'

const path = require('path')
const childprocess = require('child_process')

exports.dep = ['serve:wwwroot']
exports.fn = (gulp, paths, argv, done) => {
  let winExt = /^win/.test(process.platform) ? '.cmd' : ''
  let nodeBinDir = path.join('node_modules', '.bin')
  let protractorBin = path.join(nodeBinDir, 'protractor' + winExt)

  childprocess.spawn(protractorBin, ['protractor.conf.js'], {stdio: 'inherit'})
    .on('close', (code) => {
      if (code !== 0) {
        process.exit(code)
      } else {
        done()
      }
    })
}
