import Vue from "vue";
import Router, { RouteConfig } from "vue-router";

import Greetings from "./helloworld/greetings";
import SayHelloWorld from "./helloworld/sayhelloworld";

export class RouterConfiguration {
    public static build(): Router {
        const router = new Router({ routes: this.buildRoutes() });
        router.afterEach((to) => {
            Vue.nextTick(() => {
                document.title = to.meta.title(to);
            });
        });

        return router;
    }

    private static buildRoutes(): RouteConfig[] {
        const applicationTitle = "Hello World";
        return [
            {
                component: SayHelloWorld,
                meta: { title: (): string => `Say Hello World! | ${applicationTitle}` },
                path: "/",
            },
            {
                component: SayHelloWorld,
                meta: { title: (): string => `Say Hello World! | ${applicationTitle}` },
                path: "/sayhelloworld",
            },
            {
                component: Greetings,
                meta: { title: (): string => `Greetings | ${applicationTitle}` },
                path: "/greetings",
            },
        ];
    }
}
