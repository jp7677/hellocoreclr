"use strict";

// Import the fetch polyfill before the Aurelia fetch client to keep compatibility with Safari
import "fetch";

import appsettingsJson from "../appsettings.json!";
import {Environment} from "./environment";
import {Statusbar} from "./statusbar";
import {HttpClient} from "aurelia-fetch-client";
import {Aurelia, Container, LogManager} from "aurelia-framework";
import {Logger} from "aurelia-logging";
import {ConsoleAppender} from "aurelia-logging-console";

export function configure(aurelia: Aurelia) {
  Statusbar.Inc();
  let log: Logger = LogManager.getLogger("Main");
  let env: Environment = new Environment(appsettingsJson);

  aurelia.use
    .standardConfiguration();

  configureLogging(env);
  configureContainer(aurelia.container, env);

  log.info(`Starting in ${appsettingsJson.applicationMode} mode.`);
  aurelia.start().then(() => {
    aurelia.setRoot("app/config");
    Statusbar.Done();
  });
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
  http.configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl(env.baseUrl);
  });

  container.registerInstance(HttpClient, http);
}
