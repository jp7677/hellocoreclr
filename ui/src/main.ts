"use strict";

import {Aurelia} from "aurelia-framework";
import "bootstrap";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.start().then(() =>
    aurelia.setRoot("app/config"));
}
