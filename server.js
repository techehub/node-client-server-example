var http = require('http')
var url = require("url");
var fs = require('fs')

var server = http.createServer()
var requestHandler = (req, res) => {
    var pathname = url.parse(req.url).pathname;

    if (pathname == "/" || pathname == "/home") {
        res.end("home page ")
    }
    if (pathname == "/register") {
        fs.readFile("register.html", (err, data) => {
            console.log(data)
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data)
        })
    }
    if (pathname == '/userRegister') {
        if (req.method == "GET") {
            var qstring = url.parse(req.url,
                parseQueryString = true).query
            console.log(qstring)
            res.end(JSON.stringify(qstring))
        } else if (req.method == "POST") {
            var d = []
            req.on("data", (data) => {
                console.log(data)
                d.push(data)
            })

            req.on("data", (data) => {
                console.log("heloo !!!!!!!")
            })
            req.on("end", () => {
                res.end(d.toString())
            })
        }
    }


}
server.on("request", requestHandler)
server.on("connection", () => {
    console.log("Connection established")
})
server.listen(3000)