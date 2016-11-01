"use strict";

// Import the fetch polyfill before the Aurelia fetch client to keep compatibility with Safari
import "fetch";

import appsettingsJson from "../appsettings.json!";
import {AppSettings} from "./appsettings";
import {Statusbar} from "./statusbar";
import {HttpClient} from "aurelia-fetch-client";
import {Aurelia, Container, LogManager} from "aurelia-framework";
import {ConsoleAppender} from "aurelia-logging-console";

export function configure(aurelia: Aurelia) {
  Statusbar.Inc();

  aurelia.use
    .standardConfiguration();

  let appSettings: AppSettings = new AppSettings(appsettingsJson);
  configureLogging(appSettings);

  registerAppSettings(aurelia.container, appSettings);
  registerHttClient(aurelia.container);

  aurelia.start().then(() => {
    aurelia.setRoot("app/config");
    Statusbar.Done();
  });
}

function configureLogging(settings: AppSettings) {
  LogManager.addAppender(new ConsoleAppender());

  if (settings.IsDevelopment()) {
    LogManager.setLevel(LogManager.logLevel.debug);
  } else if (settings.IsStaging()) {
    LogManager.setLevel(LogManager.logLevel.info);
  } else if (settings.IsProduction()) {
    LogManager.setLevel(LogManager.logLevel.error);
  }

  let log = LogManager.getLogger("Main");
  log.info(`Starting in ${settings.applicationMode} mode.`);
}

function registerAppSettings(container: Container, settings: AppSettings) {
  container.registerInstance(AppSettings, settings);
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
