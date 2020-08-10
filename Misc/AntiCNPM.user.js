// ==UserScript==
// @name         AntiCNPM
// @namespace    http://thelmgn.com/
// @version      0.1
// @description  Redirects CNPM to NPM
// @author       You
// @match        https://cnpmjs.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    location.replace(location.toString().replace("cnpmjs.org","npmjs.com"))
})();