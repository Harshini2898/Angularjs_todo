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

    //configuring app to use bodyParser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    //app.use('/api/users',users);

    app.get('/api/users', function (req, res) {
        var data = getUsers();
        res.send(data);

    });

    app.post('/api/users', function (req, res) {
        var data = getUsers();
        var newUser = {
            name: req.body.name,
            email: req.body.email,
            pwd: req.body.pwd,
            todo: []
        };

        data.push(newUser);
        saveBookData(data);
        res.sendStatus(204);
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

