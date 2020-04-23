(function () {
    angular.module('app')
        .controller('registerController', ['serveData', '$log', '$location', registerController]);

    function registerController(serveData, $log, $location) {

        var vm = this;
        vm.newUser = {};
        vm.duplicate = false;

        vm.getUserData = function () {
            serveData.getUser()
                .then(onGetUserDataSuccess)
                .catch(onGetUserDataError);
        }

        function onGetUserDataSuccess(response) {
            response.forEach(uniqueCheck);
            if (!vm.duplicate) {
                addNewUser(vm.newUser);
            }
            else {
                console.log(vm.duplicate);

            }
        }

        function uniqueCheck(value) {
            if (value.email == vm.newUser.email) {
                vm.duplicate = true;

            }
        }

        function onGetUserDataError(reason) {
            $log.error(reason);
        }

        function addNewUser() {
            serveData.addUser(vm.newUser)
                .then(onSuccess)
                .catch(onError);
        }

        function onSuccess(response) {
            $log.info(response);
            $location.path('/login');

        }

        function onError(reason) {
            $log.error(reason);
        }

    }
})();