// ==UserScript==
// @name         Auto-Update Twitter
// @namespace    http://thelmgn.com
// @version      0.1
// @description  Auto Update Twitter
// @author       theLMGN
// @match        https://twitter.com/i/notifications
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(function() {
        var scroll = document.body.scrollTop;
        document.querySelector(".new-tweets-bar").click();
        document.body.scrollTop = scroll;
    },100)
})();