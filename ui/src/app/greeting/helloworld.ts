"use strict";

import {HttpClient} from "aurelia-fetch-client";
import {LogManager, inject} from "aurelia-framework";

import {Notifier} from "./notifier";
import {SayHelloWorldResponse} from "./sayhelloworldresponse";

@inject(HttpClient)
export class HelloWorld {
    public inputText: string;
    public labelText: string;

    private log = LogManager.getLogger("HelloWorld");
    private httpClient: HttpClient;
    private notifier: Notifier;

    constructor(private $httpClient) {
        this.httpClient = $httpClient;
        this.notifier = new Notifier();
    }

    public submit() {
        let name = this.inputText;
        if (name === undefined || name.length === 0) {
            this.log.warn("No name received. abort.. ");
            this.labelText = "";
            return;
        }

        this.log.info("We got the following name: " + name);
        this.notifier.Info("Working...");

        this.httpClient.fetch("sayhelloworld/" + name)
            .then((response: Response) => {
                this.log.info("Received http code " + response.status);
                this.notifier.Info("HTTP/" + response.status);
                return response.json();
            })
            .then((data: SayHelloWorldResponse) => {
                this.log.info("Received data was: " + data.greeting);
                this.labelText = data.greeting;
            })
            .catch((response: Response) => {
                this.log.info("Received http code " + response.status);
                this.log.warn("Oops... something went wrong.");
                this.notifier.Warn("Oops... HTTP/" + response.status);
                this.labelText = "";
            });
    }
}
