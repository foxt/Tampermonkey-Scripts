// ==UserScript==
// @name         Google Drive default user account
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://drive.google.com/drive/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var path = location.pathname.replace("/drive/","");
    if (!path.startsWith("u/")) {
        location.replace(location.toString().replace("drive.google.com/drive/","drive.google.com/drive/u/4/"))
    }
})();