// ==UserScript==
// @name         InstantInterval
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://macdrop.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    return
    var functions = []
    var actuallySetInterval = setInterval
    window.setInterval = function (func, delay)
    {
        if (!functions.includes(func)) {
            functions.push(func)
            return actuallySetInterval(func,delay)
        }
        console.log("An interval was tried to be set. ",func,delay)
        return actuallySetInterval(func,1)
    };
    var actuallySetTimeout = setTimeout
    window.setTimeout = function (func, delay)
    {
        if (!functions.includes(func)) {
            functions.push(func)
            return actuallySetTimeout(func,delay)
        }
        console.log("An timeout was tried to be set. ",func,delay)
        return actuallySetTimeout(func,1)
    };
})();