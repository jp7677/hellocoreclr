import * as moment from "moment";

import { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";
import { FormattedSavedGreeting } from "./formattedsavedgreeting";
import { Notifier } from "./notifier";

import WithRender from "./greetings.html";

import { SavedGreeting } from "./messages/savedgreeting";

@WithRender
@Component
export default class Greetings extends Vue {
    public numberOfSavedGreetings = 0;
    public savedGreetings: FormattedSavedGreeting[] = [];

    private notifier: Notifier;

    constructor() {
        super();
        this.notifier = new Notifier();
    }

    public created(): Promise<[void, void]> {
        this.prepareRequests();
        return Promise.all([this.fetchNumberOfSavedGreetings(), this.fetchLastGreetings()]);
    }

    private prepareRequests(): void {
        this.notifier.Info("Working...");
    }

    private async fetchNumberOfSavedGreetings(): Promise<void> {
        let response: AxiosResponse;
        try {
            response = await this.$http.get("greetings/count");
        } catch (err) {
            return this.handleErrorResponse(err);
        }

        this.handleFetchNumberOfSavedGreetingsValidResponse(response);
    }

    private handleFetchNumberOfSavedGreetingsValidResponse(response: AxiosResponse): void {
        this.$log.info(`Received http code was: ${response.status}`);
        this.notifier.Info("HTTP/" + response.status);

        const data: string = response.data;
        this.$log.info(`Received data was: ${data}`);
        this.numberOfSavedGreetings = +data;
    }

    private async fetchLastGreetings(): Promise<void> {
        let response: AxiosResponse;
        try {
            response = await this.$http.get("greetings");
        } catch (err) {
            return this.handleErrorResponse(err);
        }

        this.handleFetchLastGreetingsValidResponse(response);
    }

    private handleErrorResponse(response: AxiosResponse | Error): void {
        if (response instanceof Error) {
            this.$log.warn(`Oops... something went wrong. ${response.message}`, response);
            this.notifier.Warn(`Oops... ${response.message}`);
        } else {
            this.$log.warn(`Oops... something went wrong. Received http code was: ${response.status}`);
            this.notifier.Warn(`Oops... HTTP/${response.status}`);
        }
    }

    private handleFetchLastGreetingsValidResponse(response: AxiosResponse): void {
        this.$log.info(`Received http code was: ${response.status}`);
        this.notifier.Info("HTTP/" + response.status);

        if (response.status === 203) {
            return;
        }

        const data: SavedGreeting[] = response.data;
        this.$log.info(`Received data was: ${data.length} elements`);

        data.forEach((element) => {
            const formatedSavedGreeting = new FormattedSavedGreeting();
            formatedSavedGreeting.greeting = element.greeting;
            formatedSavedGreeting.timestamp = moment.utc(element.timestampUtc).fromNow();
            this.savedGreetings.push(formatedSavedGreeting);
        });
    }
}
