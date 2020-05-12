describe("serveData test Suite", function(){
    var serveData={};
    var $httpBackend;
    var response;
    var userData = [
        {
            "name": "Harshini",
            "email": "harshini2898@gmail.com",
            "password": "harshu@08",
            "todo": []
        },
        {
            "name": "Sanju",
            "email": "sanju@gmail.com",
            "password": "sanju@08",
            "todo": []
        },
        {
            "name": "krishna teja",
            "email": "kteja197@gmail.com",
            "password": "Qwerty@11",
            "todo": []
        }
    ];
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

    beforeEach(module('app'));
    beforeEach(inject(function(_serveData_, _$httpBackend_){
        serveData = _serveData_;
        $httpBackend = _$httpBackend_;
    }));
    afterEach(function(){
        response="";
        userData = [
            {
                "name": "Harshini",
                "email": "harshini2898@gmail.com",
                "password": "harshu@08",
                "todo": []
            },
            {
                "name": "Sanju",
                "email": "sanju@gmail.com",
                "password": "sanju@08",
                "todo": [{
                    id:1,
                    task:"complete Assignments",
                    done:false
                }]
            },
            {
                "name": "krishna teja",
                "email": "kteja197@gmail.com",
                "password": "Qwerty@11",
                "todo": []
            }
        ];
        userById =  {
            "name": "Sanju",
            "email": "sanju@gmail.com",
            "password": "sanju@08",
            "todo": [{
                id:1,
                task:"complete Assignments",
                done:false
            }]
        };
      
    })

    it("should return all user details", function(){

        $httpBackend.when('GET','/api/users')
        .respond(200,userData);

        serveData.getUser()
        .then(function(resp){
            response = resp;
        });

        //flush function makes things synchronous
        $httpBackend.flush();
        expect(response).toEqual(userData);
    });

    it("should add user to db", function(){

        var prevUserListlen = userData.length;
        $httpBackend.when('POST', '/api/users')
        .respond(function(data){
            userData.push(data);
            return 200;
        });

        var newUser =  {
            "name": "Sudheera",
            "email": "sudheera@gmail.com",
            "password": "sudheera@08",
            "todo": []
        }
        serveData.addUser(newUser)
        .then(function(resp){
            response = resp;
        });

        $httpBackend.flush();
        expect(userData.length).toEqual(prevUserListlen+1);
        
    });

    it("should return a user by id", function(){

        $httpBackend.when('GET', '/api/users/sanju@gmail.com')
        .respond(200,userById);

        serveData.getUserById('sanju@gmail.com')
        .then(function(resp){
            response = resp;
        });

        $httpBackend.flush();
        expect(response).toEqual(userById);
    });

    it("should add a todo", function(){
        var newTodo = {
            id:2,
            task:"Draw a portrait",
            done:false
        }
        var prevTodoLen = userById.todo.length;
        $httpBackend.when('PUT','/api/users/sanju@gmail.com')
        .respond(function(){
            var tdList = userById.todo;
            tdList.push(newTodo);
            return 200;
        });

        serveData.addTodo('sanju@gmail.com', newTodo)
        .then(function(resp){
            response = resp;
        });
        $httpBackend.flush();
        expect(userById.todo.length).toEqual(prevTodoLen+1);
    });

    it("should update todo done property", function(){

        var prevDone = userById.todo[0].done;
        $httpBackend.when('PUT','/api/users/sanju@gmail.com/1')
        .respond(function(){
            var td = userById.todo[0];
            td.done = !td.done;
            return false;
        });

        serveData.updateTodoById('sanju@gmail.com','1')
        .then(function(resp){
            
            response = resp;
        })
        
        $httpBackend.flush();
        //console.log(dump(userById.todo));
        expect(userById.todo[0].done).toEqual(!prevDone);

    });

    it("delete todo by id", function(){

        var prevTodoLen = userById.todo.length;
        $httpBackend.when('DELETE','/api/users/sanju@gmail.com/1')
        .respond(function(){
            var todo = userById.todo;
            todo.splice(0,1);
            return 200;
        });

        serveData.deleteTodoById('sanju@gmail.com','1')
        .then(function(resp){
            response = resp;
        });

        $httpBackend.flush();
        expect(userById.todo.length).toEqual(prevTodoLen-1);
    })
    
})