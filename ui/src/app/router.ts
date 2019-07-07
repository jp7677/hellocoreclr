import Vue from "vue";
import Router from "vue-router";

import Greetings from "./helloworld/greetings.vue";
import SayHelloWorld from "./helloworld/sayhelloworld.vue";

Vue.use(Router);

export default new Router ({
    routes : [
        {
            component: SayHelloWorld,
            path: "/"
        },
        {
            component: SayHelloWorld,
            path: "/sayhelloworld"
        },
        {
            component: Greetings,
            path: "/greetings"
        }
    ]
});
