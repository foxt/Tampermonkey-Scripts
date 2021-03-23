// ==UserScript==
// @name         Roblox Light Mode
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.roblox.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function update(e) {
        if (e.matches) {
            for (var elem of document.querySelectorAll(".light-theme")) {
                elem.classList.remove("light-theme"); elem.classList.add("dark-theme")
            }
        } else {
            for (var elem of document.querySelectorAll(".dark-theme")) {
                elem.classList.remove("dark-theme"); elem.classList.add("light-theme")
            }
        }
    }
    update(window.matchMedia('prefers-color-scheme: dark'))
    window.matchMedia('(prefers-color-scheme: dark)').addListener(update);
})();