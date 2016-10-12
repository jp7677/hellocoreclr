"use strict";

import {Router, RouterConfiguration} from "aurelia-router";

export class Config {
  public router: Router;

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "Hello World";
    config.map([
      {
        moduleId: "app/greeting/helloworld",
        name: "helloworld",
        nav: true,
        route: ["", "helloworld"],
        title: "Hello World"
      }
    ]);

    this.router = router;
  }
}
