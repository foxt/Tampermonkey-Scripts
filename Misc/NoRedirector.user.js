// ==UserScript==
// @name         NoRedirector
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://techcrunch.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.onbeforeunload = function() {
        return "Are you sure you want to navigate away?";
    }
})();