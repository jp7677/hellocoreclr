import cypressWebpack from "cypress-webpack-preprocessor-v5";
import { ProvidePlugin } from "webpack";

module.exports = (on): any => {
    on(
        "file:preprocessor",
        cypressWebpack({
            webpackOptions: {
                resolve: {
                    extensions: [".ts", ".js"],
                    fallback: { path: require.resolve("path-browserify") },
                },
                module: {
                    rules: [
                        { test: /\.ts$/, exclude: [/node_modules/], use: [{ loader: "ts-loader" }] },
                        { test: /\.feature$/, use: [{ loader: "cypress-cucumber-preprocessor/loader" }] },
                        { test: /\.features$/, use: [{ loader: "cypress-cucumber-preprocessor/lib/featuresLoader" }] },
                    ],
                },
                plugins: [
                    new ProvidePlugin({
                        process: "process/browser",
                    }),
                ],
            },
        })
    );
};
