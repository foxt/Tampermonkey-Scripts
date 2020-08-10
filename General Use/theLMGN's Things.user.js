// ==UserScript==
// @name         theLMGN's Things
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

function log(d) {
    console.log("[tLT] ",d)
}

function insertStyle(s,o) {
    log("Inserting style " + o)
    document.body.innerHTML = `${document.body.innerHTML} <style>/*theLMGN's things*/ ${s}</style>`
}

(function() {
    'use strict';
    log(`theLMGN's things loaded on ${location.href}`)
    if (location.href.startsWith("https://www.google.com/search?q=greyscale")) {
        insertStyle(`body {filter:grayscale(100%);}`,"Google Greyscale")
    }
    if (location.href.startsWith("https://www.google.com/search")) {
        log("Changing font to " + document.querySelector("#lst-ib").value)
         insertStyle(`body, body * {font-family: ${document.querySelector("#lst-ib").value}, arial, sans-serif !important}`,"Font changer")
    }

})();