import { AxiosResponse } from "axios";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Notifier } from "./notifier";

import WithRender from "./sayhelloworld.html";

import { SayHelloWorld as SayHelloWorldMessage } from "./messages/sayhelloworld";

@WithRender
@Component
export default class SayHelloWorld extends Vue {
    public inputText: string = "";
    public greetingText: string = "";
    private notifier: Notifier;

    constructor() {
        super();
        this.notifier = new Notifier();
    }

    public async submit() {
        const name: string = this.inputText;
        this.prepareRequest(name);

        let response: AxiosResponse;
        try {
            response = await this.$http.post("sayhelloworld/", JSON.stringify(name));
        } catch (err) {
            this.handleErrorResponse(err);
            return;
        }

        this.handleValidResponse(response);
    }

    private prepareRequest(name: string) {
        this.$log.info(`We got the following name: ${name}`);
        this.notifier.Info("Working...");
    }

    private handleErrorResponse(response: AxiosResponse) {
        this.$log.warn(`Oops... something went wrong. Received http code was: ${response.status}`);
        this.notifier.Warn(`Oops... HTTP/${response.status}`);
        this.resetGreetingText();
    }

    private resetGreetingText() {
        this.greetingText = "";
    }

    private handleValidResponse(response: AxiosResponse) {
        this.$log.info(`Received http code was: ${response.status}`);
        this.notifier.Info("HTTP/" + response.status);

        const data: SayHelloWorldMessage = response.data;
        this.$log.info(`Received data was: ${data.greeting}`);
        this.greetingText = data.greeting;
    }
}
