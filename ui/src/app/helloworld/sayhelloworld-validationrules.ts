import {ValidationRules} from "aurelia-validation";
import { SayHelloWorld } from "./sayhelloworld";

export class SayHelloWorldValidationRules {
    public setRules(instance: SayHelloWorld) {
        ValidationRules
            .ensure((p: SayHelloWorld) => p.inputText)
                .displayName("Greeting name")
                .required()
                .minLength(3)
                .maxLength(20)
                .matches(/^[\w\u00C0-\u024f]+$/)
            .on(instance);
    }
}
