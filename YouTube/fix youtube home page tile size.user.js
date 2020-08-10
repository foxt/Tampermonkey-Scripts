// if you can see only this code, please install tampermonkey
// CHROME : https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo
// FIREFOX: https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/
// EDGE   : https://www.microsoft.com/store/apps/9NBLGGH5162S
// SAFARI : https://download.mozilla.org/?product=firefox-latest-ssl&os=osx&lang=en-US




// ==UserScript==
// @name         fix youtube home page tile size
// @namespace    http://thelmgn.com
// @version      0.1
// @description  makes youtube home tiles not look like shite
// @author       thelmgn
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(function() {
        document.querySelector("ytd-rich-grid-renderer").style.setProperty("--ytd-rich-grid-items-per-row",6)
    },60)
})();