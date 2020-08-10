// ==UserScript==
// @name         Scrollprog
// @namespace    http://thelmgn.com/
// @version      0.1
// @description  Miniprogress bar at the top of webpages.
// @author       theLMGN
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    // CONFIGURATION:
    var color = "#176feaaa";
    var allowSiteCustomization = true;
    var height = "2px"
    var bottom = false; //true = on the bottom, false = on the top
    var hideScrollbar = true // chrome, safari, vivaldi, etc only
    // END CONFIG:

    function getColor() {
        if (!allowSiteCustomization) { return color }
        if (document.querySelector("meta[name='theme-color']")) { return document.querySelector("meta[name='theme-color']").content}
        if (document.querySelector("meta[name='msapplication-TileColor']")) { return document.querySelector("meta[name='msapplication-TileColor']").content}
        return color
    }
    'use strict';
    var style = document.createElement("style");
    style.innerText = "::-webkit-scrollbar {display:none;}";
    if (hideScrollbar) {
        document.body.appendChild(style)
    }
    var element = document.createElement("div");
    element.id = "scrollprog"
    element.style.position = "fixed"
    element.style.left = "0px"
    if (bottom) {
        element.style.top = "calc(100vh - " + height + ")"
    } else {
        element.style.top = "0px"
    }
    element.style.height = height
    element.style.width = "50vw"
    element.style.background = getColor();
    element.style.zIndex = "10000"
    element.style.boxShadow = `0 4px 8px 0 ` + getColor()
    element.style.transition = "0s none"
    document.body.appendChild(element)
    setInterval(function() {
        try {
            element.style.width = new String((document.scrollingElement.scrollTop / (document.scrollingElement.scrollHeight - window.innerHeight)) * 100) + "vw"
            if (document.scrollingElement.scrollHeight <= window.innerHeight) { //Hide bar when page doesn't support scrolling
                element.style.display = "none"
            } else {
                element.style.display = "block"
            }
        } catch(e) {}
    })
})();