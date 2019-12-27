// tslint:disable:interface-name
// tslint:disable:no-empty-interface

const srcContext = (require as any).context("../src/app/", true, /\.ts$/);
srcContext.keys().map(srcContext);

const testContext = (require as any).context("./", true, /spec\.ts$/);
testContext.keys().map(testContext);
