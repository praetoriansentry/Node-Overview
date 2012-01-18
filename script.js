/*global $: false, io: false*/
/*jslint browser: true, maxerr: 50, indent: 4 */

/**
 * Setting up an object to put all of my classes and what not
 */
var com;
if (!com) {
    com = {};
}

(function () {
    "use strict";
    /**
     * This is a small class to manage the socket.io connection
     * it provides a nice interface around socket.io that is meant specifically for this app.
     */
    function Socket(username) {
        this.username = username;
        this.connect();
        this.listen();
    }
    var s = Socket.prototype;

    /**
     * Small method that initializes the connection and sets the socket field
     */
    s.connect = function () {
        var host = window.location.host,
            socket = io.connect('http://' + host + ':8000');
        this.socket = socket;
    };

    /**
     * Simple method to listen for socket messages.  When we get the, we'll publish an
     * event locally that the Manager can read
     */
    s.listen = function () {
        this.socket.on('recvmsg', function (data) {
            // publish takes an array of args to be applied to the subscribed functions
            $.publish('/recvmsg', [data]);
        });
    };

    /**
     * Takes a message argument and sends it out.
     */
    s.send = function (msg) {
        this.socket.emit('sendmsg', msg);
    };

    // Exporting to the common namespace.
    com.Socket = Socket;
}());

(function () {
    "use strict";

    /**
     * A simple class to manage the activity on the page
     */
    function Manager() {
        this.init();
        // Default value for the user name
        this.username = 'asdf';
        // Socket is created after the user name is specified
        this.socket =  null;
    }

    var m = Manager.prototype;

    /**
     * Initializaiton hook, pretty... pretty... simple right now
     */
    m.init = function () {
        this.attachListeners();
    };

    /**
     * Method where I attach all of the listeners for the page
     */
    m.attachListeners = function () {
        var that = this;
        // pressing the begin button
        $('.logininfo button').click(function () {
            that.setUserName.call(that);
        });

        // pressing return in the username field
        $('#username').keyup(function (evt) {
            if (evt.which === 13) {
                that.setUserName.call(that);
            }
        });

        // pressing return in the chat area
        $('.chat textarea').keyup(function (evt) {
            if (evt.which === 13 && !evt.shiftKey) {
                that.sendMessage.call(that);
            }
        });
    };

    /**
     * This is the method that is called when the user specifies a username
     */
    m.setUserName = function () {
        var uname = $('#username').val().trim(),
            that = this;
        if (uname === '') {
            // need to have a user name that isn't blank
            return;
        }

        // Save the user name to the object
        this.username = uname;

        // Create the socket and save it
        this.socket = new com.Socket(this.username);
        // Subscribe to recvmsg topic.  Whenever the socket recieves messages, this topic will be published to
        $.subscribe('/recvmsg', function (msg) {
            that.recvMsg.call(that, msg);
        });

        // Fetch the last 10 messages for some context
        this.fetchLastMessages();

        // Hide the login for, show the chat window, and focus in the text area.
        $('.logininfo').addClass('hidden');
        $('.chat').removeClass('hidden');
        $('.chat textarea').focus();
    };

    /**
     * This method is called when a user presses enter in the chat box.
     * We read the data from the text area, push the message into the 
     * chat window, and pass the message to the socket
     */
    m.sendMessage = function () {
        var msg = this.clearTextArea();
        this.pushMessage(this.username, msg);
        this.socket.send({message: msg, username: this.username});
    };

    /**
     * this is the method thats called when the socket gets a new message.
     * We simply push the message into the dom
     */
    m.recvMsg = function (data) {
        this.pushMessage(data.username, data.message);
    };

    /**
     * This method takes in the details of a message, and adds it to the chat window
     */
    m.pushMessage = function (username, msg, date) {
        if (!date) {
            date = new Date();
        }
        var msgLine = this.createMsgLine(username, date, msg);
        $(msgLine).appendTo('.conversation');
        this.scrollDown();
    };

    /**
     * Determine the scroll height of the conversation div and scroll down
     */
    m.scrollDown = function () {
        var conversation = $('.conversation'),
            height = conversation.prop('scrollHeight') - conversation.innerHeight();
        if (height > 0) {
            conversation.scrollTop(height);
        }
    };

    /**
     * Simple method to clear out the text area and return the value
     */
    m.clearTextArea = function () {
        var currentValue = $('.chat textarea').val();
        $('.chat textarea').val('');
        return currentValue;
    };

    /**
     * this method takes the details of the message and creates a dom element for the messages
     */
    m.createMsgLine = function (username, time, msg) {
        var div = document.createElement('div'),
            uname = document.createElement('span'),
            timestamp = document.createElement('span'),
            message = document.createElement('span'),
            mins = time.getMinutes(),
            hours = time.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (mins < 10) {
            mins = '0' + mins;
        }
        uname.innerHTML = username + ': ';
        timestamp.innerHTML = '[' + hours + ':' + mins + '] ';
        message.innerHTML = this.encode(msg);

        div.appendChild(timestamp);
        div.appendChild(uname);
        div.appendChild(message);

        return div;
    };

    /**
     * Weird jquery method of avoiding XSS
     */
    m.encode = function (msg) {
        return $('<div/>').text(msg).html();
    };

    /**
     * Ajax method to fetch the last 10 messages from mongodb.  The messages will all be pushed
     * into the chat window
     */
    m.fetchLastMessages = function () {
        var host = window.location.host,
            that = this;
        $.ajax({
            url : 'http://' + host + ':8000/message/',
            dataType: 'json',
            success: function (data) {
                var i = data.length;
                while (i > 0) {
                    i = i - 1;
                    that.pushMessage(data[i].username, data[i].text, new Date(data[i].time));
                }
            }
        });
    };

    // Export the manager to the common namespace
    com.Manager = Manager;
}());

/*Kick everything off*/
$(document).ready(function () {
    "use strict";
    var pageManager = new com.Manager();
    com.pageManager = pageManager;
});
