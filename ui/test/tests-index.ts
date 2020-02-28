interface WebPackRequire {
    context(directory: string, useSubdirectories: boolean, regExp: RegExp);
}

const srcContext = ((require as unknown) as WebPackRequire).context("../src/app/", true, /\.ts$/);
srcContext.keys().map(srcContext);

const testContext = ((require as unknown) as WebPackRequire).context("./", true, /spec\.ts$/);
testContext.keys().map(testContext);
