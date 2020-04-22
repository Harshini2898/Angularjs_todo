(function(){
    angular.module('app')
    .factory('serveData', serveData);

    function serveData($http, $q){
        return {
            addUser :addUser,
            getUser : getUser,
            getUserById : getUserById,
            addTodo : addTodo
        }
        function getUser(){
            return $http({
                method:'GET',
                url: '/api/users'
            })
            .then(onGetUserSuccess)
            .catch(onGetUserError);
        }
        function onGetUserSuccess(response){
            return response.data;
        }
        function onGetUserError(reason){
            return $q.reject("Error while retrieving data HTPP statu "+reason.status);
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

        function getUserById(id){
            return $http({
                method : 'GET',
                url : '/api/users/'+id
            })
            .then(onGetUserSuccess)
            .catch(onGetUserError);
        }

        //updating user todo
        function addTodo(id, newTodo){
            return $http({
                method:'PUT',
                url :'/api/users'+id,
                data : newTodo
            })
            .then(onaddTodoSuccess)
            .catch(onaddTodoError);
        }

        function onaddTodoSuccess(response){
            return "updated todo "+response.config.data.task;
        }
        function onaddTodoError(reason){
            return $q.reject("error while updating todo Http Status "+reason.status);
        }
    }
})();