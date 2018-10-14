import {HttpClient} from "aurelia-fetch-client";
import {inject, LogManager} from "aurelia-framework";
import {Logger} from "aurelia-logging";
import * as moment from "moment";

import {FormattedSavedGreeting} from "./formattedsavedgreeting";
import {SavedGreeting} from "./messages/savedgreeting";
import {Notifier} from "./notifier";

@inject(HttpClient)
export class Greetings {
    public numberOfSavedGreetings: string = "0";
    public savedGreetings: FormattedSavedGreeting[] = [];

    private log: Logger = LogManager.getLogger("greetings");
    private httpClient: HttpClient;
    private notifier: Notifier;

    constructor(private $httpClient) {
        this.httpClient = $httpClient;
        this.notifier = new Notifier();
    }

    public activate() {
        this.prepareRequests();
        return Promise.all([
            this.fetchNumberOfSavedGreetings(),
            this.fetchLastGreetings()
        ]);
    }

    private prepareRequests() {
        this.notifier.Info("Working...");
    }

    private async fetchNumberOfSavedGreetings() {
        let response: Response;
        try {
            response = await this.httpClient.fetch("greetings/count");
        } catch (err) {
            return this.handleErrorResponse(err);
        }

        await this.handleFetchNumberOfSavedGreetingsValidResponse(response);
    }

    private async handleFetchNumberOfSavedGreetingsValidResponse(response: Response) {
        this.log.info(`Received http code was: ${response.status}`);
        this.notifier.Info("HTTP/" + response.status);

        const data: string = await response.json();
        this.log.info(`Received data was: ${data}`);
        this.numberOfSavedGreetings = data;
    }

    private async fetchLastGreetings() {
        let response: Response;
        try {
            response = await this.httpClient.fetch("greetings");
        } catch (err) {
            return this.handleErrorResponse(err);
        }

        await this.handleFetchLastGreetingsValidResponse(response);
    }

    private handleErrorResponse(response: Response) {
        this.log.warn(`Oops... something went wrong. Received http code was: ${response.status}`);
        this.notifier.Warn(`Oops... HTTP/${response.status}`);
    }

    private async handleFetchLastGreetingsValidResponse(response: Response) {
        this.log.info(`Received http code was: ${response.status}`);
        this.notifier.Info("HTTP/" + response.status);

        if (response.status === 203) {
            return;
        }

        const data: SavedGreeting[] = await response.json();
        this.log.info(`Received data was: ${data.length} elements`);

        data.forEach((element) => {
            const formatedSavedGreeting = new FormattedSavedGreeting();
            formatedSavedGreeting.greeting = element.greeting;
            formatedSavedGreeting.timestamp = moment.utc(element.timestampUtc).fromNow();
            this.savedGreetings.push(formatedSavedGreeting);
        });
    }
}
