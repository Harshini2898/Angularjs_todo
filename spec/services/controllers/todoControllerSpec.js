describe("todo Controller test suite", function(){
    var $controller, serveData, currentUser, $location, $q, $rootScope, $window;
    var userById =  {
        "name": "Sanju",
        "email": "sanju@gmail.com",
        "password": "sanju@08",
        "todo": [{
            id:1,
            task:"complete Assignments",
            done:false
        }]
    };

    beforeEach(module("app"));

    beforeEach(inject(function(_$controller_, _serveData_, _currentUser_, _$location_, _$q_ , _$rootScope_, _$window_){
        $controller = _$controller_;
        serveData = _serveData_;
        currentUser = _currentUser_;
        $location = _$location_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        $window = _$window_;
    }));

    beforeEach(function(){
        spyOn(serveData, 'getUserById').and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve(userById);
            return deferred.promise;
        })
    })

    it("on intializing controller getCurrentUser function has to be called", function(){
        $this = $controller("todoController", {currentUser : currentUser , serveData : serveData, $location : $location});
        $rootScope.$apply();
        //console.log(dump($this.userName));
        //console.log(dump($this.currentTodo));
        expect(serveData.getUserById).toHaveBeenCalled();
        expect(userById.name).toBe($this.userName);
        expect(userById.todo).toBe($this.currentTodo);
    });

    it("Add todo if task is not empty", function(){
        spyOn(serveData, 'addTodo').and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve("added Task");
            return deferred.promise;
        })
        $this = $controller("todoController", {currentUser : currentUser , serveData : serveData, $location : $location});
        $rootScope.$apply();
        var prevLen = $this.currentTodo.length;
        $this.task = "draw a portrait";
        $this.addTask();
        $rootScope.$apply();
        expect(serveData.addTodo).toHaveBeenCalled();
        expect(prevLen+1).toEqual($this.currentTodo.length);
    });

    it("if task is empty then send alert", function(){
        spyOn($window, 'alert');
        $this = $controller("todoController", {currentUser : currentUser , serveData : serveData, $location : $location});
        $rootScope.$apply();
        $this.task = "";
        $this.addTask();
        expect($window.alert).toHaveBeenCalledWith("Write some task to add");
    });

    it("after pressing logout btn current user details should be empty and redirect to home", function(){

        $this = $controller("todoController", {currentUser : currentUser , serveData : serveData, $location : $location});
        currentUser.User.email="sanjan@gmail.com";
        currentUser.User.password = "Sanjna@08";
        $rootScope.$apply();
        $this.logout();
        expect(currentUser.User.email).toEqual("");
        expect(currentUser.User.password).toEqual("");
        expect($location.url()).toBe('/');

    });

    it("should toggle done value if todoid and deleteId are different", function(){
        spyOn(serveData, "updateTodoById").and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve("updated Task done");
            return deferred.promise;
        })
        $this = $controller("todoController", {currentUser : currentUser , serveData : serveData, $location : $location});
        var list = {
            id:1,
            task:"complete Assignments",
            done:false
        };
        $this.deletedId = 2;

        $this.changeDone(list);
        $rootScope.$apply();
        expect(serveData.updateTodoById).toHaveBeenCalled();

    });

    it("should not toggle done value if todoid and deleteId are same", function(){
        spyOn(serveData, "updateTodoById").and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve("updated Task done");
            return deferred.promise;
        })
        $this = $controller("todoController", {currentUser : currentUser , serveData : serveData, $location : $location});
        var list = {
            id:1,
            task:"complete Assignments",
            done:false
        };
        $this.deletedId = 1;
        $this.changeDone(list);
        $rootScope.$apply();
        expect(serveData.updateTodoById).not.toHaveBeenCalled();
    });

    it("should delete a todo", function(){
        spyOn(serveData, "deleteTodoById").and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve("deleted todo");
            return deferred.promise;
        });
        $this = $controller("todoController", {currentUser : currentUser , serveData : serveData, $location : $location});
        $this.delete();
        $rootScope.$apply();
        expect(serveData.deleteTodoById).toHaveBeenCalled();
    });

    it("console error msg if unable to delete todo", function(){
        spyOn(serveData, "deleteTodoById").and.callFake(function(){
            var deferred = $q.defer();
            deferred.reject("unable to delete");
            return deferred.promise;
        });
        $this = $controller("todoController", {currentUser : currentUser , serveData : serveData, $location : $location});
        $this.delete();
        $rootScope.$apply();
        expect(serveData.deleteTodoById).toHaveBeenCalled();
    });


});     