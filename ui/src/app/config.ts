import { PLATFORM } from "aurelia-pal";
import { RouterConfiguration } from "aurelia-router";

export class Config {
    public configureRouter($config) {
        const config: RouterConfiguration = $config;

        config.title = "Hello World";
        config.map([
            {
                moduleId: PLATFORM.moduleName("app/helloworld/sayhelloworld"),
                name: "helloworld",
                nav: true,
                route: ["", "sayhelloworld"],
                title: "Say Hello World!"
            },
            {
                moduleId: PLATFORM.moduleName("app/helloworld/greetings"),
                name: "greetings",
                nav: true,
                route: "greetings",
                title: "Greetings"
            }
        ]);
    }
}
