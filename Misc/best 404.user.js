// ==UserScript==
// @name         best 404
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.thebest404pageever.com/swf/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    location.replace(location.toString().replace("thebest404pageever","thebest404pageeverredux"))
})();