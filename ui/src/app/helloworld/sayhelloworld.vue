<template>
    <form  class="form-horizontal" v-on:submit.prevent>
        <div class="row">
            <div class="col-3">
                <img src="./goodnewseveryone.png" class="img-responsive mx-auto rounded d-block"
                    alt="Good News!" width="200" height="150"/>
            </div>    
            <div class="col-9">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eleifend consequat magna nec feugiat. Integer lacinia nisl nulla, sit amet ornare urna euismod eu. Vestibulum imperdiet justo ut nisi mattis porta. Duis a mattis leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris massa metus, fringilla sed massa eget, condimentum iaculis lectus. Ut vel dictum turpis.

Curabitur sed scelerisque mauris, nec euismod massa. Aenean egestas, tellus at eleifend tincidunt, nibh nunc imperdiet ante, vel facilisis mi lacus a nunc. Mauris scelerisque ultricies aliquam. Cras porttitor augue ac mollis pretium. In sed nulla tellus. Nulla aliquet, sapien placerat molestie lacinia, arcu velit auctor augue, at condimentum ante libero at turpis. Integer enim eros, ultricies eu vestibulum nec, vestibulum sit amet massa. Proin non ligula lorem. Curabitur malesuada vel libero eu pulvinar. Morbi et efficitur dolor, nec scelerisque justo. 
            </div>
        </div>
        <hr />
            <div class="row form-group">
                <div class="col">
                    <input type="text"
                        v-model="inputText"
                        class="form-control input ${!inputTextHadFocus ? '' : controller.errors.length === 0 ? 'is-valid' : 'is-invalid'}"
                        placeholder="Give me some text" value.bind="inputText & validateOnChange"
                        focus.trigger="inputTextOnfocus()" maxlength="20" />
                    <div class="invalid-tooltip">Between 3 and 20, no strange characters please</div>
                </div>
                <div class="col">
                    <button @click="submit()" class="col btn btn-primary btn">
                        <i class="fa fa-play-circle-o"></i> Say Hello!
                    </button>
                </div>
                <div class="col">
                    <input type="text" class="form-control input"
                        placeholder="Something will happen over here" v-model="greetingText" disabled />
                </div>
            </div>
        <hr/>
        <router-link to="greetings">See older greetings</router-link>
    </form>
</template>

<script lang="ts">
import { AxiosResponse } from "axios";
import { Component, Prop, Vue } from "vue-property-decorator";
import { Notifier } from "./notifier";

import { SayHelloWorld as SayHelloWorldMessage } from "./messages/sayhelloworld";

@Component
export default class SayHelloWorld extends Vue {
    public inputText: string = "";
    public inputTextHadFocus: boolean;
    public greetingText: string = "";

    // TODO: Setup validation using Vue

    // private controller: ValidationController;
    // private validation: SayHelloWorldValidationRules;
    private notifier: Notifier;

    constructor() {
        super();
        this.notifier = new Notifier();

        /*
        this.controller = $controller;
        this.validation = $validation;
        this.validation.setRules(this);
        */
    }

/*
    public inputTextOnfocus(): Promise<ControllerValidateResult> {
        this.inputTextHadFocus = true;
        return this.controller.validate();
    }
*/
    public async submit() {
        const name: string = this.inputText;

        if (!(await this.testPreConditionsAndResetIfNeeded(name))) {
             return;
        }

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

    private async testPreConditionsAndResetIfNeeded(name: string): Promise<boolean> {
        /* 
        const validateResult: ControllerValidateResult = await this.controller.validate();
        if (!validateResult.valid) {
            Vue.$log.warn("Invalid name received. abort.. ");
            this.resetGreetingText();
            return false;
        }
        */
        return true;
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
</script>