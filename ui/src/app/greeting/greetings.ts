"use strict";

import {HttpClient} from "aurelia-fetch-client";
import {inject, LogManager} from "aurelia-framework";
import {Logger} from "aurelia-logging";

import {SavedGreeting} from "./messages/savedgreeting";
import {Notifier} from "./notifier";

@inject(HttpClient)
export class Greetings {
    public numberOfSavedGreetings: string = "0";
    public savedGreetings: SavedGreeting[] = [];

    private log: Logger = LogManager.getLogger("greetings");
    private httpClient: HttpClient;
    private notifier: Notifier;

    constructor(private $httpClient) {
        this.httpClient = $httpClient;
        this.notifier = new Notifier();

        this.fetchNumberOfSavedGreetings();
        this.fetchLastGreetings();
    }

    private async fetchNumberOfSavedGreetings(): Promise<any> {
        let response: Response;
        try {
            response = await this.httpClient.fetch("greetings/count");
        } catch (err) {
            this.handleErrorResponse(err);
            return;
        }

        this.handleFetchNumberOfSavedGreetingsValidResponse(response);
    }

    private async handleFetchNumberOfSavedGreetingsValidResponse(response: Response): Promise<any> {
        this.log.info(`Received http code was: ${response.status}`);
        this.notifier.Info("HTTP/" + response.status);

        let data: string = await response.json();
        this.log.info(`Received data was: ${data}`);
        this.numberOfSavedGreetings = data;
    }

    private async fetchLastGreetings(): Promise<any> {
        let response: Response;
        try {
            response = await this.httpClient.fetch("greetings");
        } catch (err) {
            this.handleErrorResponse(err);
            return;
        }

        this.handleFetchLastGreetingsValidResponse(response);
    }

    private handleErrorResponse(response: Response): void {
        this.log.warn(`Oops... something went wrong. Received http code was: ${response.status}`);
        this.notifier.Warn(`Oops... HTTP/${response.status}`);
    }

    private async handleFetchLastGreetingsValidResponse(response: Response): Promise<any> {
        this.log.info(`Received http code was: ${response.status}`);
        this.notifier.Info("HTTP/" + response.status);

        let data: SavedGreeting[] = await response.json();
        this.log.info(`Received data was: ${data.length} elements`);
        this.savedGreetings = data;
    }
}
