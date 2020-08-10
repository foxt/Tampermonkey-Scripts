// ==UserScript==
// @name         People hate change for some reason
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       theLMGN
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    if (!location.href.includes("disable_polymer=true")) {
        if (location.href.includes("?")) {
            location.replace(location.href + "&disable_polymer=true")
        } else {
            location.replace(location.href + "?disable_polymer=true")
        }
    }
})();