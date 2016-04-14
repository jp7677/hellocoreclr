/// <reference path="../../../typings/browser/ambient/angular/index.d.ts" />
/// <reference path="../../../typings/browser/ambient/toastr/index.d.ts" />
namespace app.greeting {
"use strict";

    export class HelloWorldController {
        public static $inject = ["$http", "$log"];
        public inputText: string;
        public labelText: string;

        constructor(private $http: ng.IHttpService, private $log: ng.ILogService) {
            this.inputText = undefined;
            this.labelText = "";

            this.SetToastrOptions();
        }

        public executeHelloWorld(): void  {
            let name = this.inputText;
            if (name === undefined || name.length === 0) {
                this.$log.warn("No name received. abort.. ");
                this.labelText = "";
                return;
            }

            this.$log.info("We got the following name: " + name);
            toastr.info("Working...");

            this.$http.get("/api/helloworld/" + name)
                .success((data: GetHelloWorldResponse, status: number) => {
                    this.$log.info("Received http code " + status);
                    this.$log.info("Received data was: " + data.name);

                    toastr.clear();
                    toastr.success("HTTP/" + status);
                    this.labelText = data.name;
                })
                .error((data: GetHelloWorldResponse, status: number) => {
                    this.$log.info("Received http code " + status);
                    this.$log.warn("Oops... something went wrong.");

                    toastr.clear();
                    toastr.warning("Oops... HTTP/" + status);
                    this.labelText = "";
                });
        };

        private SetToastrOptions(): void {
            toastr.options.positionClass = "toast-bottom-right";
            toastr.options.timeOut = 1500;
            toastr.options.showDuration = 100;
            toastr.options.hideDuration = 250;
        }
    }

    let app = angular.module("app");
    app.controller("HelloWorldController", greeting.HelloWorldController);
}
