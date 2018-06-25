declare var APPLICATIONMODE: string;

// Import promise polyfill for IE
import {Promise as Bluebird} from "bluebird";
// Import the fetch polyfill before the Aurelia fetch client to keep compatibility with Safari
import "whatwg-fetch";

import "bootstrap";
import "jquery";
import "popper.js";

import * as appsettings from "../appsettings.json";
import {Environment} from "./environment";
import {Loadingbar} from "./loadingbar";

import {HttpClient} from "aurelia-fetch-client";
import {Aurelia, Container, LogManager} from "aurelia-framework";
import {Logger} from "aurelia-logging";
import {ConsoleAppender} from "aurelia-logging-console";
import {PLATFORM} from "aurelia-pal";

export async function configure(aurelia: Aurelia) {
    Loadingbar.Inc();
    const env: Environment = new Environment((appsettings as any).default, APPLICATIONMODE);

    aurelia.use
        .standardConfiguration()
        .plugin(PLATFORM.moduleName("aurelia-validation"));

    configureBluebird();
    configureLoggingAppender();
    logAplicationStart(env);
    configureLoggingLevels(env);
    configureContainer(aurelia.container, env);

    await aurelia.start();

    await aurelia.setRoot(PLATFORM.moduleName("app/config"));
    Loadingbar.Done();
}

function configureBluebird() {
    Bluebird.config({
        longStackTraces: false,
        warnings: false
    });
}

function configureLoggingAppender() {
    LogManager.addAppender(new ConsoleAppender());
    LogManager.setLevel(LogManager.logLevel.info);
}

function logAplicationStart(env: Environment) {
    const log: Logger = LogManager.getLogger("Main");
    log.info(`Starting application in ${env.applicationMode} mode.`);
    log.info(`Use base URL '${env.baseUrl}'.`);
}

function configureLoggingLevels(env: Environment) {
    if (env.IsDevelopment()) {
        LogManager.setLevel(LogManager.logLevel.debug);
    } else if (env.IsStaging()) {
        LogManager.setLevel(LogManager.logLevel.info);
    } else if (env.IsProduction()) {
        LogManager.setLevel(LogManager.logLevel.error);
    }
}

function configureContainer(container: Container, env: Environment) {
    registerEnvironment(container, env);
    registerHttClient(container, env);
}

function registerEnvironment(container: Container, env: Environment) {
    container.registerInstance(Environment, env);
}

function registerHttClient(container: Container, env: Environment) {
    const http = new HttpClient();
    http.configure((config) => {
        config
            .useStandardConfiguration()
            .withBaseUrl(env.baseUrl);
    });

    container.registerInstance(HttpClient, http);
}
