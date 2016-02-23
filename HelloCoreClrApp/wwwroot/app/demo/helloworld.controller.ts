/// <reference path="../../../../typings/angularjs/angular.d.ts" />

module app{
    'use strict';

    export class HelloWorldController{
        http : ng.IHttpService;
        log : ng.ILogService;
        inputText : any;
        labelText : any;

        static $inject = ['$http', '$log'];
                
        constructor ($http : ng.IHttpService, $log : ng.ILogService) {
            this.http = $http;
            this.log = $log;
            this.inputText = undefined;
            this.labelText = '';
        }

        public executeHelloWorld(){
            var name = this.inputText;
            if (name == undefined || name.length == 0) {
                this.log.warn('No name received. abort.. ');
                this.labelText = '';
                return;
            }

            this.log.info('We got the following name: ' + name);

            this.http.get('/api/helloworld/' + name)
                .success((data : any, status) => {
                    this.log.info('Received http code ' + status);
                    this.log.info('Received data was: ' + data.Name);

                    this.labelText = data.Name;
                })
                .error((data : any, status) => {
                    this.log.info('Received http code ' + status);
                    this.log.error('Oops... something went wrong');
                    this.labelText = '';
                });
        };
    }
    
    var app = angular.module('app');
    app.controller('HelloWorldController', HelloWorldController);
}