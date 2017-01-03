"use strict";

// Import the fetch polyfill before the Aurelia fetch client to keep compatibility with Safari
import "fetch";

import "bootstrap";
import "jquery";

import appsettings from "../appsettings.json!";
import {Environment} from "./environment";
import {Statusbar} from "./statusbar";

import {HttpClient} from "aurelia-fetch-client";
import {Aurelia, Container, LogManager} from "aurelia-framework";
import {Logger} from "aurelia-logging";
import {ConsoleAppender} from "aurelia-logging-console";

export async function configure(aurelia: Aurelia) {
    Statusbar.Inc();
    let env: Environment = new Environment(appsettings);

    aurelia.use
        .standardConfiguration();

    configureLoggingAppender();
    logAplicationStart(env);
    configureLoggingLevels(env);
    configureContainer(aurelia.container, env);

    await aurelia.start();

    aurelia.setRoot("app/config");
    Statusbar.Done();
}

function configureLoggingAppender() {
    LogManager.addAppender(new ConsoleAppender());
    LogManager.setLevel(LogManager.logLevel.info);
}

function logAplicationStart(env: Environment) {
    let log: Logger = LogManager.getLogger("Main");
    log.info(`Starting application in ${env.applicationMode} mode.`);
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
    let http = new HttpClient();
    http.configure((config) => {
        config
            .useStandardConfiguration()
            .withBaseUrl(env.baseUrl);
    });

    container.registerInstance(HttpClient, http);
}
