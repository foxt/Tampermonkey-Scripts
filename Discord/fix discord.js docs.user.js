// ==UserScript==
// @name         fix discord.js docs
// @namespace    http://thelmgn.com/
// @version      0.1
// @description  A thing.
// @author       theLMGN
// @match        https://discord.js.org/*
// @grant        none
// ==/UserScript==

setInterval(function() {
    try {
        document.title = document.querySelector("h1").innerText + " | discord.js"
    } catch(e){}
})