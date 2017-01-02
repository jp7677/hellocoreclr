var protractor = require('protractor')
const phantomjs = require('phantomjs-prebuilt')

exports.config = {
  framework: 'mocha',
  plugins: [{
    package: 'aurelia-protractor-plugin'
  }],

  capabilities: {
    'browserName': 'phantomjs',
    'phantomjs.binary.path': phantomjs.path
  },
  seleniumServerJar: './node_modules/selenium-jar/bin/selenium-server-standalone-2.52.0.jar',
  localSeleniumStandaloneOpts: {
    args: ['-Djna.nosys=true']
  },

  baseUrl: 'http://localhost:3000',
  specs: ['test/e2e.spec.js'],

  onPrepare: () => {
    protractor.ignoreSynchronization = true
  },

  mochaOpts: {
    reporter: 'spec',
    timeout: 6000
  }
}
