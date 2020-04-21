(function(){
    angular.module('app')
        .controller('registerController', ['serveData', '$log','$location' , registerController]);

    function registerController(serveData, $log, $location){

        var vm = this;
        vm.newUser = {};
        
        
        vm.addNewUser = function(){
            serveData.addUser(vm.newUser)
            .then(onSuccess)
            .catch(onError);
        }

        function onSuccess(response){
            $log.info(response);
            $location.path('/');

        }

        function onError(reason){
            $log.error(reason);
        }

    }
})();