"use strict";

import {baseUrl} from "../constants";
import {HttpClient} from "aurelia-fetch-client";
import {LogManager} from "aurelia-framework";
import {GetHelloWorldResponse} from "gethelloworldresponse";
import toastr from "toastr";

export class HelloWorld {
    public inputText: string;
    public labelText: string;
    private log = LogManager.getLogger("HelloWorld");

    constructor() {
        this.SetToastrOptions();
    }

    public submit() {
        let name = this.inputText;
        if (name === undefined || name.length === 0) {
            this.log.warn("No name received. abort.. ");
            this.labelText = "";
            return;
        }

        this.log.info("We got the following name: " + name);
        toastr.info("Working...");

        let client = new HttpClient();

        client.configure(config => {
            config.withInterceptor({ response(response) {
                if (response.status !== 200) {
                    throw response;
                } else {
                    return response;
                }
            }});
        });

        client.fetch(baseUrl + "helloworld/" + name)
            .then(response => {
                this.log.info("Received http code " + response.status);

                toastr.clear();
                toastr.success("HTTP/" + response.status);
                response.json()
                    .then((data: GetHelloWorldResponse) => {
                        this.log.info("Received data was: " + data.name);
                        this.labelText = data.name;
                    });
            })
            .catch(response => {
                this.log.info("Received http code " + response.status);
                this.log.warn("Oops... something went wrong.");

                toastr.clear();
                toastr.warning("Oops... HTTP/" + response.status);
                this.labelText = "";
            });
    }

    private SetToastrOptions(): void {
        toastr.options.positionClass = "toast-bottom-right";
        toastr.options.timeOut = 1500;
        toastr.options.showDuration = 100;
        toastr.options.hideDuration = 250;
    }
}
