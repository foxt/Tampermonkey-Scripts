// ==UserScript==
// @name         autocomplete
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://essentials.joincyberdiscovery.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if ((document.querySelector("body > div.page.page-student.page-white.page-full > div.module.module-section > div > div.topper > span").innerText == "Text" ||
       document.querySelector("body > div.page.page-student.page-white.page-full > div.module.module-section > div > div.topper > span").innerText == "Video") &&
       document.querySelector("#sectionActions > a").dataset.status == "incomplete") {
       document.querySelector("#sectionActions > a").click()
    }
})();