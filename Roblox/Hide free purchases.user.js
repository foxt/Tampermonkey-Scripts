// ==UserScript==
// @name         Hide free purchases
// @namespace    http://thelmgn.com/
// @version      0.1
// @description  A thing.
// @author       theLMGN
// @match        https://www.roblox.com/my/money.aspx
// @grant        none
// ==/UserScript==

setInterval(function() {
    for (var item of document.querySelectorAll(".datarow")) {
        if (item.querySelector(".Amount").innerText == "0") {
            item.remove()
        }
    }
},500)
