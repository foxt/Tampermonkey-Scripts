// ==UserScript==
// @name         polyfills
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://sight-reader.herokuapp.com/piano_40
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    navigator.getUserMedia = function(cs,scc,err) {navigator.mediaDevices.getUserMedia(cs).then(scc).catch(err)}
})();