var mongo = require('mongodb'),
    com;
if (!com) {
    com = {};
}
(function () {
    "use strict";
    function MessageManager() {
        this.db = new mongo.Db('chat', new mongo.Server("127.0.0.1", 27017, {}));
    }
    var m = MessageManager.prototype;

    m.insertMessage = function (text, username, callback) {
        this.db.open(function (error, client) {
            if (error) {
                throw error;
            }
            var messages = new mongo.Collection(client, 'messages');
            messages.insert({text: text, username: username, time: new Date()}, {safe: true}, callback);
        });
    };

    com.MessageManager = MessageManager;
}());

exports.MessageManager = com.MessageManager;
