/*jslint node: true, maxerr: 50, indent: 4 */
var mongo = require('mongodb'),
    com;
if (!com) {
    com = {};
}
(function () {
    "use strict";
    /**
     * The point of this class is to provide a simple interface for working with mongo db
     */
    function MessageManager() {
        this.db = new mongo.Db('chat', new mongo.Server("127.0.0.1", 27017, {}));
    }
    var m = MessageManager.prototype;

    /**
     * This will save the given information to the db
     */
    m.insertMessage = function (text, username, callback) {
        this.db.open(function (error, client) {
            if (error) {
                throw error;
            }
            var messages = new mongo.Collection(client, 'messages');
            messages.insert({text: text, username: username, time: new Date()}, {safe: true}, callback);
        });
    };

    /**
     * This will fetch the last 10 messages from the database
     */
    m.getLastMessages = function (callback) {
        this.db.open(function (error, client) {
            if (error) {
                throw error;
            }
            var messages = new mongo.Collection(client, 'messages');
            messages.find({}).sort({time: -1}).limit(10).toArray(callback);
        });
    };

    com.MessageManager = MessageManager;
}());

exports.MessageManager = com.MessageManager;
