// ==UserScript==
// @name         Free auto purchase
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.roblox.com/catalog/*
// @grant        window.close
// ==/UserScript==

(function() {
    'use strict';
    if (document.querySelector(".icon-checkmark-white-bold")) {if (document.hidden) {window.close()}}
    if (document.querySelector(".price-container-text").innerText == "") {
        document.querySelector(".btn-fixed-width-lg").click()
        setTimeout(function() {if (document.querySelector(".text-robux").innerText = "Free") {document.querySelector("#confirm-btn").click()}},100)
        setTimeout(function() {if (document.hidden) {window.close()}},2000)
    }
})();