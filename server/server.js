//Add the current directory to the list of include paths
require.paths.unshift('.');
var app = require('http').createServer(httpHandler),
    io = require('socket.io').listen(app),
    router = require('router');

function httpHandler(req, res) {
    var r = new router.Router(req, res);
    r.dispatch();
}

app.listen(8000, "0.0.0.0");

io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
