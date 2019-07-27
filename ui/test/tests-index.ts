// tslint:disable:interface-name
// tslint:disable:no-empty-interface

interface IWebpackRequire {
    context: any;
}
interface NodeRequire extends IWebpackRequire {}

const srcContext = require.context("../src/app/", true, /\.ts$/);
srcContext.keys().map(srcContext);

const testContext = require.context("./", true, /spec\.ts$/);
testContext.keys().map(testContext);
