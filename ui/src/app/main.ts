declare var APPLICATIONMODE: string;

// Import promise polyfill for IE
import { Promise as Bluebird } from "bluebird";

import * as appsettings from "../appsettings.json";
import { Environment } from "./environment";
import { Loadingbar } from "./loadingbar";

import axios from "axios";
import BootstrapVue from "bootstrap-vue";
import Vue from "vue";
import VueAxios from "vue-axios";
import Router from "vue-router";
import VueLogger from "vuejs-logger";

import App from "./app";
import { RouterConfiguration } from "./router-configuration";

configureAndMountVue();

// tslint:disable:no-submodule-imports
import "font-awesome/scss/font-awesome.scss";
import "../styles/bootstrap.scss";
import "../styles/toastr.scss";

import "../styles/main.scss";

function configureAndMountVue() {
    Loadingbar.Inc();
    const environment: Environment = new Environment(appsettings, APPLICATIONMODE);

    Vue.use(BootstrapVue);
    Vue.use(VueAxios, axios);
    Vue.use(Router);
    Vue.use(VueLogger, {
        logLevel: getLoggingLevel(environment),
        separator: "|",
        showConsoleColors: true,
        showLogLevel: true,
        showMethodName: false
    });

    configureBluebird();
    configureHttp(environment);
    logAplicationStart(environment);

    const router = RouterConfiguration.build();
    const vue = new Vue({
        render: h => h(App),
        router
    });

    vue.$mount("#app");
    Loadingbar.Done();
}

function getLoggingLevel(env: Environment) {
    if (env.IsDevelopment()) {
        return "debug";
    } else if (env.IsProduction()) {
        return "error";
    }
    return "info";
}

function configureBluebird() {
    Bluebird.config({
        longStackTraces: false,
        warnings: false
    });
}

function configureHttp(env: Environment) {
    Vue.axios.defaults.baseURL = env.baseUrl;
    Vue.axios.defaults.headers = { "Content-Type": "application/json" };
}

function logAplicationStart(env: Environment) {
    // tslint:disable-next-line:no-console
    console.info(`Starting application in ${env.applicationMode} mode.`);
    Vue.$log.info(`Use base URL '${env.baseUrl}'.`);
}
