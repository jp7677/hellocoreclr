/// <reference path="../../../../typings/angularjs/angular.d.ts" />
"use strict";

namespace app.greeting {
    export class HelloWorldController {
        private http: ng.IHttpService;
        private log: ng.ILogService;
        inputText: string;
        labelText: string;

        static $inject = ["$http", "$log"];

        constructor($http: ng.IHttpService, $log: ng.ILogService) {
            this.http = $http;
            this.log = $log;
            this.inputText = undefined;
            this.labelText = "";
        }

        executeHelloWorld() {
            let name = this.inputText;
            if (name === undefined || name.length === 0) {
                this.log.warn("No name received. abort.. ");
                this.labelText = "";
                return;
            }

            this.log.info("We got the following name: " + name);

            this.http.get("/api/helloworld/" + name)
                .success((data: GetHelloWorldResponse, status) => {
                    this.log.info("Received http code " + status);
                    this.log.info("Received data was: " + data.Name);

                    this.labelText = data.Name;
                })
                .error((data: GetHelloWorldResponse, status) => {
                    this.log.info("Received http code " + status);
                    this.log.warn("Oops... something went wrong");
                    this.labelText = "";
                });
        };
    }

    let app = angular.module("app");
    app.controller("HelloWorldController", greeting.HelloWorldController);
}
