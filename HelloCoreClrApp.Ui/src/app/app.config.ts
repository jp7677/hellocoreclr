/// <reference path="../../typings/globals/angular/index.d.ts" />
/// <reference path="../../typings/globals/angular-ui-router/index.d.ts" />

namespace app {
"use strict";

    export class Config {
        public static $inject = ["$stateProvider", "$urlRouterProvider"];

        constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
            $urlRouterProvider.otherwise("/helloworld");

            $stateProvider
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
