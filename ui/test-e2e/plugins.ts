import cypressWebpack from "@cypress/webpack-preprocessor";

module.exports = (on): any => {
    on(
        "file:preprocessor",
        cypressWebpack({
            webpackOptions: {
                resolve: { extensions: [".ts", ".js"] },
                module: {
                    rules: [
                        { test: /\.ts$/, exclude: [/node_modules/], use: [{ loader: "ts-loader" }] },
                        { test: /\.feature$/, use: [{ loader: "cypress-cucumber-preprocessor/loader" }] },
                        { test: /\.features$/, use: [{ loader: "cypress-cucumber-preprocessor/lib/featuresLoader" }] },
                    ],
                },
            },
        })
    );
};
