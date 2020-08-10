// ==UserScript==
// @name         snek+
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://discordapp.com/404
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    var playing = false
    setInterval(function() {
        var ele = document.querySelector("#app-mount > div > div > div.overlay-4WLqe2 > div > div.flex-1xMQg5.flexVertical-3EM43-.flexJustifyCenter-XyJP9E.flexAlignCenter-2tn6as.flexWrap-1K8nA-.gameOverText-JfDmua > div:nth-child(2) > div:nth-child(1)")
        if (ele) {
            if (playing == true) {
                console.log(GM_xmlhttpRequest({method:"GET", url:"http://127.0.0.1:8001/snek?score=" + ele.innerText.replace("Points: ","")}))
            }
            playing = false
        } else {
            playing = true
        }
    },150)



})();