// ==UserScript==
// @name         Fucking Oath
// @namespace    http://thelmgn.com/
// @version      0.1
// @description  A thing.
// @author       theLMGN
// @match        https://www.tumblr.com/privacy/consent*
// @grant        none
// ==/UserScript==

var elems = [
    "#guce_index > div.l-container > div > div > div > div.final-btn-consent > div > button.btn.no",
    "#guce_index > div.l-container > div > div > div > div:nth-child(3) > div > div > div > a",
    "#guce_index > div.l-container > div > div > div > div:nth-child(4) > div > div > div > div.guce-partner-consent-form > div:nth-child(6) > p > a",
    function() { for (var check of document.querySelectorAll(".iab-vendor-input")) {check.checked = false} },
    "#partner-consent-submit",
    "#guce_index > div.l-container > div > div > div > div.final-btn-consent > div > button.btn.yes"
]
for (var elem of elems) {
    if (typeof elem == "string") {
        document.querySelector(elem).click()
    } else {
        elem()
    }
}
