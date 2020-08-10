// ==UserScript==
// @name         mc ads
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*.com/?server_id=*
// @grant        none
// ==/UserScript==

let adDelay = 60

(function() {
    'use strict';
    var hasReloaded = false;
    setInterval(function() {
        if (document.querySelector("#post-message").style.opacity == 1 && hasReloaded == false) {
            hasReloaded = true;
            setTimeout(function() {location.reload()},adDelay)
        }
        if (document.querySelector("#no-fill-message").style.opacity == 1 && hasReloaded == false) {
            hasReloaded = true;
            setTimeout(function() {location.reload()},2500)
        }
    },100)
})();