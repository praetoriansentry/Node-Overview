/*jslint node: true, maxerr: 50, indent: 4, unparam: true*/
var com,
    msg = require('messagemanager');
if (!com) {
    com = {};
}

(function () {
    "use strict";
    var routes = {
        GET: {},
        POST: {},
        PUT: {},
        DELETE: {}
    };

    // curl -v  -X GET "http://10.0.1.16:8000/message/"
    routes.GET.message = function (request, response) {
        var m = new msg.MessageManager();
        m.getLastMessages(function (err, docs) {
            response.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            response.end(JSON.stringify(docs));
        });
    };

    // curl -v  -X POST "http://10.0.1.16:8000/message/?username=praetoriansentry&message=testagain"
    routes.POST.message = function (request, response) {
        var m = new msg.MessageManager(),
            query = require('url').parse(request.url, true).query;
        if (typeof query === 'undefined'
                || typeof query.username === 'undefined'
                || typeof query.message === 'undefined'
                || query.username === ''
                || query.message === '') {
            response.writeHead(405, 'Missing Required Parameters');
            response.end();
            return;
        }

        m.insertMessage(query.message, query.username, function () {
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end();
        });
    };

    com.routes = routes;
}());

(function () {
    "use strict";

    var routes = com.routes,
        r;

    function Router(request, response) {
        this.request = request;
        this.response = response;
    }

    r = Router.prototype;

    r.showRoot = function () {
        this.response.writeHead(200, {'Content-Type': 'text/plain'});
        this.response.end('Demo Chat Server');
    };

    r.sendNotFound = function () {
        this.response.writeHead(404, 'Not Found');
        this.response.end();
    };

    r.dispatch = function () {
        var verb = this.request.method,
            pieces = this.parse(this.request.url),
            folders = pieces.pathname.split('/');
        folders.pop();
        folders.shift();

        if (pieces.href === '/') {
            return this.showRoot();
        }

        if (folders.length === 0) {
            return this.sendNotFound();
        }
        if (typeof routes[verb] === 'undefined' || typeof routes[verb][folders[0]] === 'undefined') {
            return this.sendNotFound();
        }
        return routes[verb][folders[0]](this.request, this.response);
    };

    // steal the parse function from the url module
    r.parse = require('url').parse;

    com.Router = Router;
}());

exports.Router = com.Router;
