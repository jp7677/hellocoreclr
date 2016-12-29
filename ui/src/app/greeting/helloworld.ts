"use strict";

import {HttpClient} from "aurelia-fetch-client";
import {inject, LogManager} from "aurelia-framework";
import {Logger} from "aurelia-logging";

import {SayHelloWorld} from "./messages/sayhelloworld";
import {Notifier} from "./notifier";

@inject(HttpClient)
export class HelloWorld {
    public inputText: string;
    public greetingText: string;

    private log: Logger = LogManager.getLogger("HelloWorld");
    private httpClient: HttpClient;
    private notifier: Notifier;

    constructor(private $httpClient) {
        this.httpClient = $httpClient;
        this.notifier = new Notifier();
    }

    public async submit() {
        let name: string = this.inputText;

        if (!this.testPreConditionsAndResetIfNeeded(name)) {
            return;
        }

        this.prepareRequest(name);

        let response: Response;
        try {
            response = await this.httpClient.fetch("sayhelloworld/" + name);
        } catch (err) {
            this.handleErrorResponse(err);
            return;
        }

        this.handleValidResponse(response);
    }

    private testPreConditionsAndResetIfNeeded(name: string): boolean {
        if (name === undefined || name.length === 0) {
            this.log.warn("No name received. abort.. ");
            this.resetGreetingText();
            return false;
        }
        return true;
    }

    private prepareRequest(name: string): void {
        this.log.info(`We got the following name: ${name}`);
        this.notifier.Info("Working...");
    }

    private handleErrorResponse(response: Response): void {
        this.log.warn(`Oops... something went wrong. Received http code was: ${response.status}`);
        this.notifier.Warn(`Oops... HTTP/${response.status}`);
        this.resetGreetingText();
    }

    private resetGreetingText(): void {
        this.greetingText = "";
    }

    private async handleValidResponse(response: Response): Promise<any> {
        this.log.info(`Received http code was: ${response.status}`);
        this.notifier.Info("HTTP/" + response.status);

        let data: SayHelloWorld = await response.json();
        this.log.info(`Received data was: ${data.greeting}`);
        this.greetingText = data.greeting;
    }
}
