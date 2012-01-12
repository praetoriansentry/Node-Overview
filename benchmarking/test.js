var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain',
        'Content-Length': '11'});
    res.end('Hello World');
}).listen(1337, "0.0.0.0");
console.log('Server running on port 1337/');
