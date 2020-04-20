(function () {
    angular.module('app')
        .controller('homeController', homeController);

    function homeController($location) {
        var vm = this;
        vm.goToRegister = function () {
            $location.path('/register');

        }
    }
})();