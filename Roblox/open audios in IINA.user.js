// ==UserScript==
// @name         open audios in IINA
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.roblox.com/library/*/*
// @match        https://www.roblox.com/develop/library*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var opened = false
    setInterval(function() {
        if (document.querySelector("audio").src != "about:blank" && opened != document.querySelector("audio").src) {
            console.log(document.querySelector("audio").src)
            location.replace("iina://open?url=" + encodeURIComponent(document.querySelector("audio").src));
            document.querySelector("audio").src = "about:blank"
            opened = document.querySelector("audio").src
        }
    },15)
})();