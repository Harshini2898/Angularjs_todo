(function(){
    angular.module("app")
    .controller("todoController" , ['currentUser' ,'serveData', '$location', todoController]);

    function todoController(currentUser, serveData, $location){
        var vm = this;
        vm.done = false;
        //adding task to screen and to user.json
        vm.addTask = function(){
            var newTask = {
                id:vm.currentTodo.length + 1,
                task:vm.task,
                done:false
            }
            vm.currentTodo.push(newTask);
           vm.task="";
           console.log(vm.currentTodo);
           addingTodo(newTask);
        }

        vm.logout = function(){
            currentUser.User.email="";
            currentUser.User.password = "";
            $location.path('/');
        }

        vm.changeDone = function(list){
            list.done = !list.done;
            todoId = list.id;
            console.log(list.done);
            serveData.updateTodoById(currentUser.User.email, todoId)
            .then(onSuccess)
            .catch(onError)
        }
        function addingTodo(newTask){
            serveData.addTodo(currentUser.User.email,newTask)
            .then(onSuccess)
            .catch(onError)
        }

        vm.delete = function(id){

            serveData.deleteTodoById(currentUser.User.email,id)
            .then(onSuccess)
            .catch(onError);

            getCurrentUser();
        
        }
        //getting todo List of current User
        getCurrentUser = function(){
            serveData.getUserById(currentUser.User.email)
            .then(onGetUserSuccess)
            .catch(onError);
        }

        function onGetUserSuccess(response){
            if(response != 0){
                console.log(currentUser.User.email);
                vm.userName = response.name;
                vm.currentTodo = response.todo;
                
            }
        }
        function onSuccess(response){
            console.log(response);
        }
        function onError(reason){
            console.log(reason);
        }
        
        getCurrentUser();
    }
})();
