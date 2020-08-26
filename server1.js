var http = require('http')
var url = require("url");
var fs = require('fs')
var mime = require('mime')


var server = http.createServer()

var requestHandler = (req, res) => {
    var pathname = url.parse(req.url).pathname;
    if (pathname == "/users") {
        console.log(mime.getType('data.json'))
        res.writeHead(200, { 'Content-Type': mime.getType('data.txt') });
        fs.createReadStream("data.txt").pipe(res)
    }
}

server.on("request", requestHandler)

server.on("connection", () => {
    console.log("Connection established")
})
server.listen(3000)