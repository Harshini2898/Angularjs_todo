const express = require('express');
//calling default express function to create express instance
const app = express();
const path = require('path');
const router = express.Router();

//to acces files in public folder
app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(4000, function(){
    console.log("listening on 4000 port");
})