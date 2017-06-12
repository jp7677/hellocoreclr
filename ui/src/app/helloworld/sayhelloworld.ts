import {HttpClient} from "aurelia-fetch-client";
import {inject, LogManager, NewInstance} from "aurelia-framework";
import {Logger} from "aurelia-logging";
import {ControllerValidateResult, ValidationController, ValidationRules} from "aurelia-validation";

import {SayHelloWorld as SayHelloWorldMessage} from "./messages/sayhelloworld";
import {Notifier} from "./notifier";

@inject(HttpClient, NewInstance.of(ValidationController))
export class SayHelloWorld {
    public inputText: string = "";
    public inputTextHadFocus: boolean;
    public greetingText: string = "";

    private log: Logger = LogManager.getLogger("HelloWorld");
    private httpClient: HttpClient;
    private controller: ValidationController;
    private notifier: Notifier;

    constructor(private $httpClient, private $controller) {
        this.httpClient = $httpClient;
        this.controller = $controller;
        this.notifier = new Notifier();

        ValidationRules
            .ensure("inputText")
                .displayName("Greeting name")
                .required()
                .minLength(3)
                .maxLength(20)
                .matches(/^[\w\u00C0-\u024f]+$/)
            .on(this);
    }

    public async inputTextOnfocus() {
        this.inputTextHadFocus = true;
        await this.controller.validate();
    }

    public async submit() {
        const name: string = this.inputText;

        if (!await this.testPreConditionsAndResetIfNeeded(name)) {
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

    private async testPreConditionsAndResetIfNeeded(name: string): Promise<boolean> {
        const validateResult: ControllerValidateResult = await this.controller.validate();

        if (!validateResult.valid) {
            this.log.warn("Invalid name received. abort.. ");
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

        const data: SayHelloWorldMessage = await response.json();
        this.log.info(`Received data was: ${data.greeting}`);
        this.greetingText = data.greeting;
    }
}
