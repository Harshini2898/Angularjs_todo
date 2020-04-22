(function(){
    angular.module('app')
    .factory('serveData', serveData);

    function serveData($http, $q){
        return {
            addUser :addUser,
            getUserById :getUserById
        }

        function getUserById(id){
            return $http({
                method:'GET',
                url :'/api/users/' +id,
                data : id
            })
            .then(onSuccess)
            .catch(onError);

        }

        function onSuccess(response)
        {

            return response.data;
        }

        function onError(reason)
        {
            return $q.reject("Error while retrieving data HTPP status "+reason.status);
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
            return "Added User "+response.config.data.name;
        }

        function onaddUserError(reason){
            return $q.reject("Error while adding user Http status "+reason.status);
        }
    }
})();