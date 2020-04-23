(function(){
    angular.module('app')
    .factory('serveData', serveData);

    function serveData($http, $q){
        return {
            addUser :addUser,
            getUser : getUser,
            getUserById : getUserById,
            addTodo : addTodo,
            updateTodoById : updateTodoById,
            deleteTodoById : deleteTodoById
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
            return "Added User "+response.config.data.name;
        }

        function onaddUserError(reason){
            return $q.reject("Error while adding user Http status "+reason.status);
        }

        function getUserById(id){
            return $http({
                method : 'GET',
                url : '/api/users/'+id,
                data : id
            })
            .then(onGetUserSuccess)
            .catch(onGetUserError);
        }

        //updating user todo
        function addTodo(id, newTodo){
            return $http({
                method:'PUT',
                url :'/api/users/'+id,
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

        function updateTodoById(id,todoId){
            return $http({
                method:'PUT',
                url :'/api/users/'+id+'/'+todoId
            })
            .then(onUpdateTodoSuccess)
            .catch(onUpdateTodoError);
        }

        function onUpdateTodoSuccess(response){
            return "updated todo ";
        }
        function onUpdateTodoError(reason){
            return $q.reject("error while updating todo Http Status "+reason.status);
        }

        function deleteTodoById(id,todoId){
            return $http({
                method : 'DELETE',
                url :'/api/users/'+id+'/'+todoId
            })
            .then(onDeleteSuccess)
            .catch(onDeleteError);
        }
    
        function onDeleteSuccess(response){
            return "deleted todo ";
        }
        function onDeleteError(reason){
            return $q.reject("error while deleting todo Http Status "+reason.status);
        }
    }
})();