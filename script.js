/*global $: false*/
/*jslint browser: true, maxerr: 50, indent: 4 */
var com;
if (!com) {
    com = {};
}

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
    };

    m.setUserName = function () {
        var uname = $('#username').val().trim();
        if (uname === '') {
            // need to have a user name that isn't blank
            return;
        }

        this.username = uname;
    };

    com.Manager = Manager;
}());

/*Kick everything off*/
$(document).ready(function () {
    "use strict";
    var pageManager = new com.Manager();
    com.pageManager = pageManager;
});
