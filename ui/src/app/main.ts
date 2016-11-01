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
  let log: Logger = LogManager.getLogger("Main");
  let env: Environment = new Environment(appsettingsJson);

  Statusbar.Inc();

  aurelia.use
    .standardConfiguration();

  configureLogging(env);
  registerEnvironment(aurelia.container, env);
  registerHttClient(aurelia.container);

  log.info(`Starting in ${appsettingsJson.applicationMode} mode.`);
  aurelia.start().then(() => {
    aurelia.setRoot("app/config");
    Statusbar.Done();
  });
}

function configureLogging(settings: Environment) {
  LogManager.addAppender(new ConsoleAppender());

  if (settings.IsDevelopment()) {
    LogManager.setLevel(LogManager.logLevel.debug);
  } else if (settings.IsStaging()) {
    LogManager.setLevel(LogManager.logLevel.info);
  } else if (settings.IsProduction()) {
    LogManager.setLevel(LogManager.logLevel.error);
  }
}

function registerEnvironment(container: Container, settings: Environment) {
  container.registerInstance(Environment, settings);
}

function registerHttClient(container: Container) {
  let http = new HttpClient();
  http.configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl("/api/");
  });

  container.registerInstance(HttpClient, http);
}
