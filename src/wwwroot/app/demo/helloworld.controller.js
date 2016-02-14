(function() {
    angular
        .module('app')
        .controller('HelloWorldController', helloWorldController);

    helloWorldController.$inject = ['$http', '$log'];

    function helloWorldController($http, $log) {
        var vm = this;
        vm.inputText = undefined;
        vm.labelText = '';

        vm.executeHelloWorld = function() {
            var name = vm.inputText;
            if (name == undefined || name.length == 0) {
                $log.warn('No name received. abort.. ');
                vm.labelText = '';
                return;
            }

            $log.info('We got the following name: ' + name);

            $http.get('/api/helloworld/' + name)
                .success(function(data, status) {
                    $log.info('Received http code ' + status);
                    $log.info('Received data was: ' + data.Name);

                    vm.labelText = data.Name;
                })
                .error(function(data, status) {
                    $log.info('Received http code ' + status);
                    $log.error('Oops... something went wrong');
                    vm.labelText = '';
                });
        };
    }
})();
