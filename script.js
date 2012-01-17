/*global $: false, io: false*/
/*jslint browser: true, maxerr: 50, indent: 4 */
var com;
if (!com) {
    com = {};
}

(function () {
    "use strict";
    function Socket(username) {
        this.username = username;
        this.connect();
        this.listen();
    }
    var s = Socket.prototype;

    s.connect = function () {
        var host = window.location.host,
            socket = io.connect('http://' + host + ':8000');

        socket.emit('newuser', {username: this.username});
        this.socket = socket;
    };

    s.listen = function () {
        this.socket.on('recvmsg', function (data) {
            $.publish('/recvmsg', [data]);
        });
    };

    s.send = function (msg) {
        this.socket.emit('sendmsg', msg);
    };

    com.Socket = Socket;
}());

(function () {
    "use strict";

    function Manager() {
        this.init();
        this.username = 'asdf';
        this.socket =  null;
    }

    var m = Manager.prototype;

    m.init = function () {
        this.attachListeners();
    };

    m.attachListeners = function () {
        var that = this;
        $('.logininfo button').click(function () {
            that.setUserName.call(that);
        });
        $('#username').keyup(function (evt) {
            if (evt.which === 13) {
                that.setUserName.call(that);
            }
        });
        $('.chat textarea').keyup(function (evt) {
            if (evt.which === 13 && !evt.shiftKey) {
                that.sendMessage.call(that);
            }
        });
    };

    m.setUserName = function () {
        var uname = $('#username').val().trim(),
            that = this;
        if (uname === '') {
            // need to have a user name that isn't blank
            return;
        }

        this.username = uname;

        this.socket = new com.Socket(this.username);
        $.subscribe('/recvmsg', function (msg) {
            that.recvMsg.call(that, msg);
        });

        this.fetchLastMessages();

        $('.logininfo').addClass('hidden');
        $('.chat').removeClass('hidden');
        $('.chat textarea').focus();
    };

    m.sendMessage = function () {
        var msg = this.clearTextArea();
        this.pushMessage(this.username, msg);
        this.socket.send({message: msg, username: this.username});
    };

    m.recvMsg = function (data) {
        this.pushMessage(data.username, data.message);
    };

    m.pushMessage = function (username, msg, date) {
        if (!date) {
            date = new Date();
        }
        var msgLine = this.createMsgLine(username, date, msg);
        $(msgLine).appendTo('.conversation');
        this.scrollDown();
    };

    m.scrollDown = function () {
        var conversation = $('.conversation'),
            height = conversation.prop('scrollHeight') - conversation.innerHeight();
        if (height > 0) {
            conversation.scrollTop(height);
        }
    };

    m.clearTextArea = function () {
        var currentValue = $('.chat textarea').val();
        $('.chat textarea').val('');
        return currentValue;
    };

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

    m.encode = function (msg) {
        return $('<div/>').text(msg).html();
    };

    m.fetchLastMessages = function () {
        var host = window.location.host,
            that = this;
        $.ajax({
            url : 'http://' + host + ':8000/message/',
            success: function (data) {
                var i = data.length;
                while (i > 0) {
                    i = i - 1;
                    that.pushMessage(data[i].username, data[i].text, new Date(data[i].time));
                }
            }
        });
    };

    com.Manager = Manager;

}());

/*Kick everything off*/
$(document).ready(function () {
    "use strict";
    var pageManager = new com.Manager();
    com.pageManager = pageManager;
});
