/// <reference path="../../../typings/index.d.ts" />

"use strict";

import {GetHelloWorldResponse} from "gethelloworldresponse";
import * as toastr from "toastr";

export class HelloWorldController {
    public static $inject = ["apiBaseUrl", "$http", "$log"];
    public inputText: string;
    public labelText: string;

    constructor(private apiBaseUrl: string, private $http: ng.IHttpService, private $log: ng.ILogService) {
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

        this.$http.get(this.apiBaseUrl + "helloworld/" + name)
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
