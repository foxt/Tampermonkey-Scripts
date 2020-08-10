// ==UserScript==
// @name         AutoCSE
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://help.twitter.com/forms/cse
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(function() {
        document.querySelector("#twitter_cse").click()
        if (!document.querySelector("#certify_statement").checked) {
            document.querySelector("#certify_statement").click()
        }
    })
})();