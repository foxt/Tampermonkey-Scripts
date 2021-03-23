// ==UserScript==
// @name         Bot info on invite
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://discord.com/oauth2/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    if (location.toString().includes("/oauth2/authorize?")) {
        GM_setValue("clientId",location.toString().split("client_id=")[1].split("&")[0])
        document.querySelector(".authorize-3eAFPo > .footer-3ZalXG > .colorBrand-3pXr91").onclick = function() {
            GM_setValue("clientId",location.toString().split("client_id=")[1].split("&")[0])
        }
    }
    if (location.toString().includes("/oauth2/authorized")) {
        setTimeout(function() {
        document.querySelector(".wrapper-L5YRoB").innerHTML += `<a href="https://top.gg/bot/${GM_getValue("clientId")}" class="button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeXlarge-2yFAlZ grow-q77ONN" style="margin-top: 8px" type="button"><div class="contents-18-Yxp">To top.gg!</div></a>`
        },500)
    }
})();