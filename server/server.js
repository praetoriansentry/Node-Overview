/*jslint node: true, maxerr: 50, indent: 4 */
//Add the current directory to the list of include paths
require.paths.unshift('.');

/**
 * Simple function to dispatch our router whenever we get a request
 */
function httpHandler(req, res) {
    "use strict";
    var router = require('router'),
        r = new router.Router(req, res);
    r.dispatch();
}

var app = require('http').createServer(httpHandler),
    io = require('socket.io').listen(app);

// Listen for socket.io connections
io.sockets.on('connection', function (socket) {
    "use strict";
    // When we recieve a message we'll broadcast it out
    socket.on('sendmsg', function (data) {
        var MessageManager  = require('messagemanager').MessageManager,
            mm = new MessageManager();
        // broadcast the messages
        socket.broadcast.emit('recvmsg', data);

        //save the data
        mm.insertMessage(data.message, data.username, function () {});
    });
});

// start listening
app.listen(8000, "0.0.0.0");
