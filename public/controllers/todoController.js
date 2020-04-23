(function(){
    angular.module("app")
    .controller("todoController" , ['currentUser' ,'serveData', '$location', todoController]);

    function todoController(currentUser, serveData, $location){
        var vm = this;
        vm.done = false;
        vm.deletedId = -1;
        //adding task to screen and to user.json
        vm.addTask = function(){
            console.log(vm.task);
            if(vm.task == undefined || vm.task == ""){
                alert("Write some task to add");
            }
          
            else{
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
            console.log(vm.task);
            console.log(vm.currentTodo.length);
           
        }

        vm.logout = function(){
            currentUser.User.email="";
            currentUser.User.password = "";
            $location.path('/');
        }

        vm.changeDone = function(list){
            list.done = !list.done;
            todoId = list.id;
            if(vm.deletedId != todoId){
                vm.deletedId = -1;
                console.log(list.done);
                serveData.updateTodoById(currentUser.User.email, todoId)
                .then(onSuccess)
                .catch(onError)
            }
            vm.deletedId = -1;
           
        }
        function addingTodo(newTask){
            serveData.addTodo(currentUser.User.email,newTask)
            .then(onSuccess)
            .catch(onError)
        }

        function onSuccess(response){
            console.log(response);
        }
        function onError(reason){
            console.log(reason);
        }

        vm.delete = function(todoId){
            serveData.deleteTodoById(currentUser.User.email, todoId)
            .then(onSuccess)
            .catch(onError);
            getCurrentUser();
            console.log("deleted");
            vm.deletedId = todoId;
        }


        //getting todo List of current User
        getCurrentUser = function(){
            serveData.getUserById(currentUser.User.email)
            .then(onGetUserSuccess)
            .catch(onGetUserError);
        }

        function onGetUserSuccess(response){
            if(response != 0){
                console.log(currentUser.User.email);
                vm.userName = response.name;
                vm.currentTodo = response.todo;
                
            }
        }
        function onGetUserError(reason){
            console.log(reason);
        }
        getCurrentUser();
    }
})();
