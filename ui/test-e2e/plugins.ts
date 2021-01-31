import cypressWebpack from "@cypress/webpack-preprocessor";
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
                        { test: /\.ts$/i, exclude: [/node_modules/], use: [{ loader: "ts-loader" }] },
                        { test: /\.feature$/i, use: [{ loader: "cypress-cucumber-preprocessor/loader" }] },
                        { test: /\.features$/i, use: [{ loader: "cypress-cucumber-preprocessor/lib/featuresLoader" }] },
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
