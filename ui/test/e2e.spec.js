var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
var protractor = require('protractor')

describe('End2end test suite', () => {
  it('should load completely and have a title', (done) => {
    protractor.browser.loadAndWaitForAureliaPage('/')
    chai.expect(protractor.browser.getTitle()).to.eventually.be.equal('Hello World | Hello Worl1d')
      .notify(done)
  })
})
