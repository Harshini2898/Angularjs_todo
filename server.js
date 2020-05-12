(function () {

    const express = require('express');
    //calling default express function to create express instance
    const app = express();
    const path = require('path');
    const datafile = 'server/data/user.json';
    const fs = require('fs');
    var bodyParser = require('body-parser');

    //to acces files in public folder(front end view)
    app.use(express.static('public'));
    app.use(express.static('lib'));

    //configuring app to use bodyParser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    //app.use('/api/users',users);

    app.get('/api/users', function (req, res) {
        var data = getUsers();
        res.send(data);

    });

    app.get('/api/users/:id', function(req,res){
        var data = getUsers();
        var matchedUser = data.filter(function(item){
            return item.email == req.params.id;
        });
        if(matchedUser.length == 0){
            res.sendStatus(404);
        }
        else{
            res.send(matchedUser[0]);
        }
    })
    
    app.post('/api/users', function (req, res) {
        var data = getUsers();
        var newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            todo: []
        };

        data.push(newUser);
        saveBookData(data);
        res.sendStatus(204);
    })

    app.get('/api/users/:id', function(req,res){
        var data = getUsers();
        var matchedUser = data.filter(function(item){
            return item.email == req.params.id;
        });
        if(matchedUser.length == 0){
            res.sendStatus(404);
        }
        else{
            res.send(matchedUser[0]);
        }
    })

    app.put('/api/users/:id', function(req,res){
        var data = getUsers();
        var matchedUser = data.filter(function(item){
            return item.email == req.params.id;
        });
        if(matchedUser.length == 0){
            res.sendStatus(404);
        }
        else{
            var userToUpdate = matchedUser[0];
            userToUpdate.todo.push(req.body);
            saveBookData(data);
            res.sendStatus(204);
        }
    })

    app.put('/api/users/:id/:todoId', function(req,res){
        var data = getUsers();
        tid = req.params.todoId;
        var matchedUser = data.filter(function(item){
            return item.email == req.params.id;
        });
        if(matchedUser.length == 0){
            res.sendStatus(404);
        }
        else{
            var userTodo = matchedUser[0].todo;
            userTodo[tid-1].done = !userTodo[tid-1].done;
            saveBookData(data);
            res.sendStatus(204);
        }
    })

    app.delete('/api/users/:id/:todoId', function(req,res){
        var data = getUsers();
        tid = req.params.todoId;
        var matchedUser = data.filter(function(item){
            return item.email == req.params.id;
        });
        if(matchedUser.length == 0){
            res.sendStatus(404);
        }
        else{
            var userTodo = matchedUser[0].todo;
            userTodo.splice(tid-1, 1);
            todoLength = userTodo.length;
            if(todoLength >= tid){
                for(var i=tid-1; i<todoLength ;i++){
                    userTodo[i].id= userTodo[i].id-1;
                }
            }
            saveBookData(data);
            res.sendStatus(204);
        }
    })


    function getUsers() {
        var data = fs.readFileSync(datafile, 'utf8');
        return JSON.parse(data);
    }

    function saveBookData(data) {
        fs.writeFile(datafile, JSON.stringify(data), function (err) {
            if (err) {
                console.log(err);
            }
        })
    }
    app.listen(3500, function () {
        console.log("listening on 3500 port ");
    })

})();

