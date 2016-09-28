"use strict";

export class Config {
    public static $inject = ["$stateProvider", "$urlRouterProvider"];

    constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
        $urlRouterProvider.otherwise("/helloworld");

        $stateProvider
            .state("helloworld", {
                controller: "HelloWorldController",
                controllerAs: "vm",
                templateUrl: "app/greeting/helloworld.html",
                url: "/helloworld"
            });
    }
}
