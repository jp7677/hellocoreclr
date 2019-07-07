import Router from "vue-router";

import Greetings from "./helloworld/greetings";
import SayHelloWorld from "./helloworld/sayhelloworld";

export default new Router({
    routes: [
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
