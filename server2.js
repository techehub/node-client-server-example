var express = require('express');
var mime = require('mime')
var fs = require('fs')

var app = express();
app.get('/', function(req, res) {
    res.send('Hello World');
})

app.get('/users', function(req, res) {
    res.writeHead(200, { 'Content-Type': mime.getType('data.json') });
    fs.createReadStream("data.json").pipe(res)
})

app.get('/users/:id', function(req, res) {
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function(err, data) {
        var users = JSON.parse(data);
        console.log(users)
        var user = users["user" + req.params.id]
        console.log(user);
        res.end(JSON.stringify(user));
    });
})



app.listen(8081, function() {
    console.log(" Express server ins listening on port 8081")
})