"use strict";

import {HttpClient} from "aurelia-fetch-client";
import {inject, LogManager} from "aurelia-framework";
import {Logger} from "aurelia-logging";

import {Notifier} from "./notifier";
import {SayHelloWorldResponse} from "./sayhelloworldresponse";

@inject(HttpClient)
export class HelloWorld {
    public inputText: string;
    public labelText: string;

    private log: Logger = LogManager.getLogger("HelloWorld");
    private httpClient: HttpClient;
    private notifier: Notifier;

    constructor(private $httpClient) {
        this.httpClient = $httpClient;
        this.notifier = new Notifier();
    }

    public async submit() {
        let name: string = this.inputText;
        if (name === undefined || name.length === 0) {
            this.log.warn("No name received. abort.. ");
            this.labelText = "";
            return;
        }

        this.log.info(`We got the following name: ${name}`);
        this.notifier.Info("Working...");

        try {
            let response: Response = await this.httpClient.fetch("sayhelloworld/" + name);
            this.log.info(`Received http code ${response.status}`);
            this.notifier.Info("HTTP/" + response.status);

            let data: SayHelloWorldResponse = await response.json();
            this.log.info(`Received data was: ${data.greeting}`);
            this.labelText = data.greeting;
        } catch (err) {
            let response: Response = err;
            this.log.info(`Received http code ${response.status}`);
            this.log.warn("Oops... something went wrong.");
            this.notifier.Warn(`Oops... HTTP/${response.status}`);
            this.labelText = "";
        }
    }
}
