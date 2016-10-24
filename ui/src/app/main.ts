"use strict";

import {Statusbar} from "./statusbar";
import {HttpClient} from "aurelia-fetch-client";
import {Aurelia} from "aurelia-framework";

export function configure(aurelia: Aurelia) {
  Statusbar.Inc();
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  configureContainer(aurelia.container);

  aurelia.start().then(() => {
    aurelia.setRoot("app/config");
    Statusbar.Done();
  });
}

function configureContainer(container) {
  let http = new HttpClient();
  http.configure(config => {
    config
      .useStandardConfiguration()
      .withBaseUrl("/api/");
  });

  container.registerInstance(HttpClient, http);
}
