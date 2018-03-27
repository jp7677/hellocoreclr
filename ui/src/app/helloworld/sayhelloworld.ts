import {HttpClient} from "aurelia-fetch-client";
import {inject, LogManager, NewInstance} from "aurelia-framework";
import {Logger} from "aurelia-logging";
import {ControllerValidateResult, ValidationController, ValidationRules} from "aurelia-validation";

import {SayHelloWorld as SayHelloWorldMessage} from "./messages/sayhelloworld";
import {Notifier} from "./notifier";
import {SayHelloWorldValidationRules} from "./sayhelloworld-validationrules";

@inject(HttpClient, NewInstance.of(ValidationController), NewInstance.of(SayHelloWorldValidationRules))
export class SayHelloWorld {
    public inputText: string = "";
    public inputTextHadFocus: boolean;
    public greetingText: string = "";

    private log: Logger = LogManager.getLogger("HelloWorld");
    private httpClient: HttpClient;
    private controller: ValidationController;
    private validation: SayHelloWorldValidationRules;
    private notifier: Notifier;

    constructor(private $httpClient, private $controller, private $validation) {
        this.httpClient = $httpClient;
        this.controller = $controller;
        this.validation = $validation;
        this.notifier = new Notifier();

        this.validation.setRules(this);
    }

    public inputTextOnfocus(): Promise<ControllerValidateResult> {
        this.inputTextHadFocus = true;
        return this.controller.validate();
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
            return this.handleErrorResponse(err);
        }

        await this.handleValidResponse(response);
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

    private prepareRequest(name: string) {
        this.log.info(`We got the following name: ${name}`);
        this.notifier.Info("Working...");
    }

    private handleErrorResponse(response: Response) {
        this.log.warn(`Oops... something went wrong. Received http code was: ${response.status}`);
        this.notifier.Warn(`Oops... HTTP/${response.status}`);
        this.resetGreetingText();
    }

    private resetGreetingText() {
        this.greetingText = "";
    }

    private async handleValidResponse(response: Response) {
        this.log.info(`Received http code was: ${response.status}`);
        this.notifier.Info("HTTP/" + response.status);

        const data: SayHelloWorldMessage = await response.json();
        this.log.info(`Received data was: ${data.greeting}`);
        this.greetingText = data.greeting;
    }
}
