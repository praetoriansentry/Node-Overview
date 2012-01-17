/*jslint node: true, maxerr: 50, indent: 4 */
//Add the current directory to the list of include paths
require.paths.unshift('.');

function httpHandler(req, res) {
    "use strict";
    var router = require('router'),
        r = new router.Router(req, res);
    r.dispatch();
}

var app = require('http').createServer(httpHandler),
    io = require('socket.io').listen(app);



app.listen(8000, "0.0.0.0");

io.sockets.on('connection', function (socket) {
    "use strict";
    socket.on('sendmsg', function (data) {
        var MessageManager  = require('messagemanager').MessageManager,
            mm = new MessageManager();
        socket.broadcast.emit('recvmsg', data);
        mm.insertMessage(data.message, data.username, function () {});
    });
});
