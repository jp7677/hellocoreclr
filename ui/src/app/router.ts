import Vue from "vue";
import Router from "vue-router";

import Greetings from "./helloworld/greetings";
import SayHelloWorld from "./helloworld/sayhelloworld";

const applicationTitle = "Hello World";
const router = new Router({
    routes: [
        {
            component: SayHelloWorld,
            meta: { title: route => `Say Hello World! | ${applicationTitle}` },
            path: "/"
        },
        {
            component: SayHelloWorld,
            meta: { title: route => `Say Hello World! | ${applicationTitle}` },
            path: "/sayhelloworld"
        },
        {
            component: Greetings,
            meta: { title: route => `Greetings | ${applicationTitle}` },
            path: "/greetings"
        }
    ]
});

router.afterEach((to, from) => {
    Vue.nextTick(() => {
        document.title = to.meta.title(to);
    });
});

export default router;
