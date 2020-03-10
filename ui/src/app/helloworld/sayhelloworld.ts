import { AxiosResponse } from "axios";
import { Component, Vue } from "vue-property-decorator";
import { Notifier } from "./notifier";

import WithRender from "./sayhelloworld.html";

import { SayHelloWorld as SayHelloWorldMessage } from "./messages/sayhelloworld";

@WithRender
@Component
export default class SayHelloWorld extends Vue {
    public inputText = "";
    public greetingText = "";
    private notifier: Notifier;

    constructor() {
        super();
        this.notifier = new Notifier();
    }

    public async submit(): Promise<void> {
        const value: string = this.inputText;
        this.prepareRequest(value);

        let response: AxiosResponse;
        try {
            response = await this.$http.post("sayhelloworld/", JSON.stringify({ name: value }));
        } catch (err) {
            this.handleErrorResponse(err);
            return;
        }

        this.handleValidResponse(response);
    }

    private prepareRequest(value: string): void {
        this.$log.info(`We got the following name: ${value}`);
        this.notifier.Info("Working...");
    }

    private handleErrorResponse(response: AxiosResponse | Error): void {
        if (response instanceof Error) {
            this.$log.warn(`Oops... something went wrong. ${response.message}`, response);
            this.notifier.Warn(`Oops... ${response.message}`);
        } else {
            this.$log.warn(`Oops... something went wrong. Received http code was: ${response.status}`);
            this.notifier.Warn(`Oops... HTTP/${response.status}`);
        }
        this.resetGreetingText();
    }

    private resetGreetingText(): void {
        this.greetingText = "";
    }

    private handleValidResponse(response: AxiosResponse): void {
        this.$log.info(`Received http code was: ${response.status}`);
        this.notifier.Info("HTTP/" + response.status);

        const data: SayHelloWorldMessage = response.data;
        this.$log.info(`Received data was: ${data.greeting}`);
        this.greetingText = data.greeting;
    }
}
