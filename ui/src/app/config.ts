"use strict";

import {RouterConfiguration} from "aurelia-router";

export class Config {
    public configureRouter($config) {
        let config: RouterConfiguration = $config;

        config.title = "Hello World";
        config.map([{
            moduleId: "app/greeting/helloworld",
            name: "helloworld",
            nav: true,
            route: ["", "helloworld"],
            title: "Hello World"
        }]);
    }
}
