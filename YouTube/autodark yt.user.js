// ==UserScript==
// @name         autodark yt
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function setDarkMode(dark) {
        if (dark)  document.body.setAttribute("dark",true)
        if (!dark) document.body.removeAttribute("dark")
    }
    setDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        setDarkMode(e.matches)
    });
})();