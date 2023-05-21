var mainPath = "/home/pi/Desktop/New-Buffalo-Physics-Skate-Park-Website";
var homePath = "/home.html";
const fs = require('fs');
const http = require('http');

function handleRequest(req, res) {
    var requestedFile = req.url;
    if (req.url == "/" || req.url.toLowerCase() == "/home") {
        requestedFile = homePath;
    }
    if (requestedFile.slice(requestedFile.length - 6, requestedFile.length).indexOf(".") == -1) {
        requestedFile += ".html";
    }
    fs.readFile(mainPath + requestedFile, function (err, data) {
        if (err) {
            fs.readFile(mainPath + homePath, function (err404, data404) {
                if (err404) {
                    console.log();
                    console.log("ERROR 404: Your home page does not exist!");
                    console.log("  >> Expected location: " + mainPath + homePath);
                    res.writeHead(404, {'Content-Type':'text/html'});
                    res.write("<html lang='en'><h1>404</h1><h2>Sorry.  You tried to visit a page on our site that doesn't exist, and our server is currently experiencing issues.  Please wait patiently and try coming back later.  Thank you.</h2><h1 style='font-size:200px'>):</h1></html>");
                    res.end();
                } else {
                    console.log();
                    console.log(" ~ 404 ~ Someone tried to access a nonexistent file: " + req.url);
                    res.writeHead(404);
                    res.write(data404);
                    res.end();
                }
            });
        } else {
            if (requestedFile.length - requestedFile.lastIndexOf(".svg") == 4) {
                res.writeHead(200, {'Content-Type':'image/svg+xml'});
            } else {
                res.writeHead(200);
            }
            res.write(data);
            res.end();
        }
    });
}

http.createServer(handleRequest).listen(80);
