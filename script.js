/*global $: false*/
/*jslint browser: true, maxerr: 50, indent: 4 */
var com;
if (!com) {
    com = {};
}
(function () {
    "use strict";

    function Poller() {
    }
    var p = Poller.prototype;

    com.Poller = Poller;
}());

(function () {
    "use strict";

    function Manager() {
        this.init();
        this.username = 'asdf';
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
        var uname = $('#username').val().trim();
        if (uname === '') {
            // need to have a user name that isn't blank
            return;
        }

        this.username = uname;
        $('.logininfo').addClass('hidden');
        $('.chat').removeClass('hidden');
        $('.chat textarea').focus();
    };

    m.sendMessage = function () {
        var msg = this.clearTextArea(),
            msgLine = this.createMsgLine(this.username, new Date(), msg);
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

    com.Manager = Manager;

}());

/*Kick everything off*/
$(document).ready(function () {
    "use strict";
    var pageManager = new com.Manager();
    com.pageManager = pageManager;
});
