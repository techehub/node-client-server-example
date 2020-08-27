var express = require('express');
var mime = require('mime')
var fs = require('fs')
var bodyParser = require('body-parser')


var app = express();
app.use(bodyParser.json());

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


app.post('/users', function(req, res) {
    var params = req.body;
    console.log(params);

    fs.readFile(__dirname + "/" + "data.json", 'utf8', function(err, data) {
        var users = JSON.parse(data);
        users['user' + params.id] = params
        console.log(users)
        fs.writeFile(__dirname + "/" + "data.json", JSON.stringify(users), (err) => {});
    });

    res.end("response from Post ")
})

app.put('/users/:id', function(req, res) {
    var params = req.body;
    console.log(params);

    fs.readFile(__dirname + "/" + "data.json", 'utf8', function(err, data) {
        var users = JSON.parse(data);
        users['user' + params.id] = params
        fs.writeFile(__dirname + "/" + "data.json", JSON.stringify(users), (err) => {});
        res.end(JSON.stringify(users));
    });
})

app.delete('/users/:id', function(req, res) {
    userId = req.params.id
    fs.readFile(__dirname + "/" + "data.json", 'utf8', function(err, data) {
        var users = JSON.parse(data);
        delete users['user' + userId]
        fs.writeFile(__dirname + "/" + "data.json", JSON.stringify(users), (err) => {});
        res.end(JSON.stringify(users));
    });
})

app.listen(8081, function() {
    console.log(" Express server ins listening on port 8081")
})