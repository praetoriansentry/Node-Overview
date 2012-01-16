//Add the current directory to the list of include paths
require.paths.unshift('.');
var http = require('http'),
    router = require('router');

http.createServer(function (req, res) {
    var r = new router.Router(req, res);
    r.dispatch();
}).listen(8000, "0.0.0.0");
