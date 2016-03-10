/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
"use strict";

namespace app {
    export class Config {
        static $inject = ["$stateProvider", "$urlRouterProvider"];

        constructor(stateProvider: ng.ui.IStateProvider, urlRouterProvider: ng.ui.IUrlRouterProvider) {
            urlRouterProvider.otherwise("/helloworld");

            stateProvider
                .state("helloworld", {
                    url: "/helloworld",
                    templateUrl: "app/greeting/helloworld.html",
                    controller: "HelloWorldController",
                    controllerAs: "vm"
                });
        }
    }

    let app = angular.module("app", ["ui.router", "ui.bootstrap"]);
    app.config(Config);
}
