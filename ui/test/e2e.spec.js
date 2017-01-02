var mocha = require('mocha')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
var protractor = require('protractor')

mocha.describe('End2end test suite', () => {
  mocha.it('should load completely and have a title', (done) => {
    protractor.browser.loadAndWaitForAureliaPage('/')
    chai.expect(protractor.browser.getTitle()).to.eventually.be.equal('Hello World | Hello World')
      .notify(done)
  })
})
