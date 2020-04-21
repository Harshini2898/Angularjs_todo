(function () {
    angular.module('app')
        .controller('homeController', homeController);

    function homeController($location) {
        var vm = this;
        vm.goToLogin = function () {
            $location.path('/login');
        }
        vm.goToRegister = function () {
            $location.path('/register');
        }
    }
    })();