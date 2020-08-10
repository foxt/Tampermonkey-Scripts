// ==UserScript==
// @name         AutoReload XE Conversion
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.xe.com/ucc/convert.cgi*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.title = document.querySelector("b.text14").innerText
    setTimeout(function() {
        location.reload()
    },10000)
})();