// ==UserScript==
// @name         Clear Local Storage
// @namespace    http://thelmgn.com/
// @version      0.1
// @description  Clears local storage every 100milis
// @author       theLMGN
// @match        https://www.roblox.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(function() {
       localStorage.clear()
    },100)
})();