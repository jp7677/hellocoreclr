<template>
    <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ante ligula, tristique eu lectus sit amet, congue faucibus quam. Fusce finibus pretium nisi, sit amet egestas augue sodales in. Nam aliquam sapien velit, vitae pellentesque lacus condimentum ac. Nam et luctus eros. Nullam laoreet odio eu libero vehicula aliquam. Aliquam vel mauris vehicula, interdum sapien quis, malesuada metus. Nullam convallis risus sit amet turpis fringilla consectetur. Nulla sit amet ipsum sit amet lorem pulvinar suscipit. Aliquam mi mauris, pellentesque at mauris vel, rutrum facilisis ipsum.
        <hr/>
        The last <span class="badge badge-primary">ten</span> greetings.
        <ul class="list-group">
            <li class="list-group-item" v-for="greeting in savedGreetings" :key="greeting.id">
                {{ greeting.greeting }}
                <span class="badge">{{ greeting.timestamp }}</span>
            </li>
        </ul>
        <div class="alert alert-secondary alert-dismissible fade show" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            We have <strong><span>{{ numberOfSavedGreetings }}</span></strong> saved greeting(s) totally.
        </div>
        <hr/>
        <router-link to="/">Say Hello</router-link>
    </div>
</template>

<script lang="ts">
import * as moment from "moment";
import { AxiosResponse } from "axios";
import { Component, Prop, Vue } from "vue-property-decorator";
import { FormattedSavedGreeting } from "./formattedsavedgreeting";
import { Notifier } from "./notifier";

import { SavedGreeting } from "./messages/savedgreeting";

@Component
export default class Greetings extends Vue {
    public numberOfSavedGreetings: string = "0";
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
        this.numberOfSavedGreetings = data;
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

    private async handleFetchLastGreetingsValidResponse(response: AxiosResponse) {
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
</script>