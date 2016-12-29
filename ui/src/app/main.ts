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
    let log: Logger = LogManager.getLogger("Main");
    let env: Environment = new Environment(appsettings);

    aurelia.use
        .standardConfiguration();

    configureLogging(env);
    configureContainer(aurelia.container, env);

    log.info(`Starting application in ${env.applicationMode} mode.`);
    await aurelia.start();

    aurelia.setRoot("app/config");
    Statusbar.Done();
}

function configureLogging(env: Environment) {
    LogManager.addAppender(new ConsoleAppender());

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
