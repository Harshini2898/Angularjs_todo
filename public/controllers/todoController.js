(function(){
    angular.module("app")
    .controller("todoController" , ['currentUser' ,'serveData', todoController]);

    function todoController(currentUser, serveData){
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
        }

        vm.delete = function(){
            console.log("deleted");
        }

        //getting todo List of current User
        getCurrentUser = function(){
            serveData.getUserById(currentUser.User.email)
            .then(onGetUserSuccess)
            .catch(onGetUserError);
        }

        function onGetUserSuccess(response){
            if(response != 0){
                console.log(response.password);
                vm.currentTodo = response.todo;
                console.log(response.todo[1]);
            }
        }
        function onGetUserError(reason){
            console.log(reason);
        }
        
        getCurrentUser();
    }
})();
