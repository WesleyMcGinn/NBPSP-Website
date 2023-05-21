var mainPath = "/home/pi/Desktop/New-Buffalo-Physics-Skate-Park-Website";
const fs = require('fs');
const http = require('http');

http.createServer(function(req, res) {
    var requestedFile = req.url;
    if (req.url.length < 5 || req.url == "/" || req.url.toLowerCase() == "/home") {
        requestedFile = "/home.html";
    }
    if (requestedFile.slice(requestedFile.length - 6, requestedFile.length).indexOf(".") == -1) {
        requestedFile += ".html";
    }
    fs.readFile(mainPath + requestedFile, function (err, data) {
        if (err) {
            fs.readFile(mainPath + "/home.html", function (err2, data2) {
                if (err2) {
                    console.log("ERROR 404: Your home page does not exist!");
                    console.log("  >> Expected location: " + mainPath + "/home.html");
                    res.writeHead(404, {'Content-Type':'text/html'});
                    res.write("<html lang='en'><h1>404</h1><h2>Sorry.  Our server is currently experiencing issues.  This should be fixed soon.  Please wait patiently and try coming back later.  Thank you.</h2><h1 style='font-size:200px'>):</h1></html>");
                } else {
                    res.writeHead(200);
                    res.write(data2);
                    console.log("No File:");
                    console.log("  >> Someone tried to access a file on the server that does not exist.");
                    console.log("  >> Path: " + requestedFile);
                }
            });
            res.end();
        } else {
            if (requestedFile.indexOf(".svg") != -1) {
                res.writeHead(200, {'Content-Type':'image/svg+xml'});
            } else {
                res.writeHead(200);
            }
            res.write(data);
            res.end();
        }
    });
}).listen(80);
