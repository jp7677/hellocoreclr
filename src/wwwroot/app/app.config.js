(function() {
    angular
        .module('app', ['ui.router', 'ui.bootstrap'])
        .config(config);

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/helloworld');

        $stateProvider
            .state('helloworld', {
                url: '/helloworld',
                templateUrl: 'app/demo/helloworld.html',
                controller: 'HelloWorldController',
                controllerAs: 'vm'
            });
    }
})();
