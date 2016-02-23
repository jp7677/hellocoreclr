/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />

module app{
    var app = angular.module('app', ['ui.router', 'ui.bootstrap']);
    
    function config(stateProvider: ng.ui.IStateProvider, urlRouterProvider: ng.ui.IUrlRouterProvider) 
    {
        urlRouterProvider.otherwise('/helloworld');

        stateProvider
            .state('helloworld', {
                url: '/helloworld',
                templateUrl: 'app/demo/helloworld.html',
                controller: 'HelloWorldController',
                controllerAs: 'vm'
            });
    }
    
    config.$inject = ["$stateProvider","$urlRouterProvider"];
    app.config(config);
}
