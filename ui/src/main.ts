"use strict";

import {HttpClient} from "aurelia-fetch-client";
import {Aurelia} from "aurelia-framework";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  configureContainer(aurelia.container);

  aurelia.start().then(() =>
    aurelia.setRoot("app/config"));
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
