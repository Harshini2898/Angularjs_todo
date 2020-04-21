(function(){
    angular.module('app')
    .factory('serveData', serveData);

    function serveData($http, $q){
        return {
            addUser :addUser
        }

        function addUser(newUser){
            return $http({
                method:'POST',
                url :'/api/users',
                data : newUser
            })
            .then(onaddUserSuccess)
            .catch(onaddUserError);
        }

        function onaddUserSuccess(response){
            return "Adde User "+response.config.data.name;
        }

        function onaddUserError(reason){
            return $q.reject("Error while adding user Http status "+reason.status);
        }
    }
})();