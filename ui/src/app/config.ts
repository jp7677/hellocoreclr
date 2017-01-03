import {RouterConfiguration} from "aurelia-router";

export class Config {
    public configureRouter($config) {
        let config: RouterConfiguration = $config;

        config.title = "Hello World";
        config.map([
        {
            moduleId: "app/helloworld/sayhelloworld",
            name: "helloworld",
            nav: true,
            route: ["", "sayhelloworld"],
            title: "Say Hello World!"
        },
        {
            moduleId: "app/helloworld/greetings",
            name: "greetings",
            nav: true,
            route: "greetings",
            title: "Greetings"
        }]);
    }
}
