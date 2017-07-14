declare var require;

const context = require.context("./", true, /\.spec\.ts$/);
context.keys().map(context);
