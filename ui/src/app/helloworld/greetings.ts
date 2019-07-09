import * as moment from "moment";

import { AxiosResponse } from "axios";
import { Component, Prop, Vue } from "vue-property-decorator";
import { FormattedSavedGreeting } from "./formattedsavedgreeting";
import { Notifier } from "./notifier";

import WithRender from "./greetings.html";

import { SavedGreeting } from "./messages/savedgreeting";

@WithRender
@Component
export default class Greetings extends Vue {
    public numberOfSavedGreetings: number = 0;
    public savedGreetings: FormattedSavedGreeting[] = [];

    private notifier: Notifier;

    constructor() {
        super();
        this.notifier = new Notifier();
    }

    public created() {
        this.prepareRequests();
        return Promise.all([this.fetchNumberOfSavedGreetings(), this.fetchLastGreetings()]);
    }

    private prepareRequests() {
        this.notifier.Info("Working...");
    }

    private async fetchNumberOfSavedGreetings() {
        let response: AxiosResponse;
        try {
            response = await this.$http.get("greetings/count");
        } catch (err) {
            return this.handleErrorResponse(err);
        }

        this.handleFetchNumberOfSavedGreetingsValidResponse(response);
    }

    private handleFetchNumberOfSavedGreetingsValidResponse(response: AxiosResponse) {
        this.$log.info(`Received http code was: ${response.status}`);
        this.notifier.Info("HTTP/" + response.status);

        const data: string = response.data;
        this.$log.info(`Received data was: ${data}`);
        this.numberOfSavedGreetings = +data;
    }

    private async fetchLastGreetings() {
        let response: AxiosResponse;
        try {
            response = await this.$http.get("greetings");
        } catch (err) {
            return this.handleErrorResponse(err);
        }

        this.handleFetchLastGreetingsValidResponse(response);
    }

    private handleErrorResponse(response: AxiosResponse) {
        this.$log.warn(`Oops... something went wrong. Received http code was: ${response.status}`);
        this.notifier.Warn(`Oops... HTTP/${response.status}`);
    }

    private handleFetchLastGreetingsValidResponse(response: AxiosResponse) {
        this.$log.info(`Received http code was: ${response.status}`);
        this.notifier.Info("HTTP/" + response.status);

        if (response.status === 203) {
            return;
        }

        const data: SavedGreeting[] = response.data;
        this.$log.info(`Received data was: ${data.length} elements`);

        data.forEach(element => {
            const formatedSavedGreeting = new FormattedSavedGreeting();
            formatedSavedGreeting.greeting = element.greeting;
            formatedSavedGreeting.timestamp = moment.utc(element.timestampUtc).fromNow();
            this.savedGreetings.push(formatedSavedGreeting);
        });
    }
}
