declare const APPLICATIONMODE: string;

// Import promise polyfill for IE
import { Promise as Bluebird } from "bluebird";

import * as appsettings from "../appsettings.json";
import { Environment } from "./environment";
import { Loadingbar } from "./loadingbar";

import axios from "axios";
import BootstrapVue from "bootstrap-vue";
import { extend, setInteractionMode, ValidationObserver, ValidationProvider } from "vee-validate";
import { max, min, regex, required } from "vee-validate/dist/rules";
import Vue from "vue";
import VueAxios from "vue-axios";
import Router from "vue-router";
import { Logger } from "./logger";

import App from "./app";
import { RouterConfiguration } from "./router-configuration";

import "font-awesome/scss/font-awesome.scss";
import "../styles/bootstrap.scss";
import "../styles/toastr.scss";
import "../styles/main.scss";
import { VNode } from "vue/types/umd";

function configureValidation(): void {
    Vue.component("ValidationProvider", ValidationProvider);
    Vue.component("ValidationObserver", ValidationObserver);
    extend("required", required);
    extend("min", min);
    extend("max", max);
    extend("regex", regex);
    setInteractionMode("fast", () => {
        return { on: ["input", "blur", "focus"] };
    });
}

function configureBluebird(): void {
    Bluebird.config({
        longStackTraces: false,
        warnings: false
    });
}

function configureHttp(env: Environment): void {
    Vue.axios.defaults.baseURL = env.baseUrl;
    Vue.axios.defaults.headers = { "Content-Type": "application/json" };
}

function logAplicationStart(vue: Vue, env: Environment): void {
    vue.$log.info(`Starting application in ${env.applicationMode} mode.`);
    vue.$log.info(`Use base URL '${env.baseUrl}'.`);
}

function configureAndMountVue(): void {
    const environment: Environment = new Environment(appsettings, APPLICATIONMODE);
    if (environment.IsKarma()) {
        return;
    }

    Loadingbar.Inc();
    Vue.use(Logger);
    Vue.use(BootstrapVue);
    Vue.use(VueAxios, axios);
    Vue.use(Router);

    configureValidation();
    configureBluebird();
    configureHttp(environment);

    const router = RouterConfiguration.build();
    const vue = new Vue({
        render: (h): VNode => h(App),
        router
    });

    vue.$mount("#app");
    logAplicationStart(vue, environment);

    Loadingbar.Done();
}

configureAndMountVue();
