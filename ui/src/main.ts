"use strict";

import { Config } from "./app/app.config";
import { HelloWorldController } from "./app/greeting/helloworld.controller";

const main = angular.module("app", ["ui.router", "ui.bootstrap"])
                 .constant("apiBaseUrl", "http://localhost:5000/api/")
                 .config(Config)
                 .controller("HelloWorldController", HelloWorldController);

const name = main.name;


export default main;
export { name }
