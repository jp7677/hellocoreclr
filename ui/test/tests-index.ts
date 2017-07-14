declare var require;

const  srcContext = require.context("../src/app/", true, /\.ts$/);
srcContext.keys().map(srcContext);

const testContext = require.context("./", true, /spec\.ts$/);
testContext.keys().map(testContext);
