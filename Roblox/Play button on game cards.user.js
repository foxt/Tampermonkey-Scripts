// ==UserScript==
// @name         Play button on game cards
// @namespace    http://thelmgn.com/
// @version      0.1
// @description  Adds a play button to the bottom of game cards
// @author       thelmgn
// @match        *://*.roblox.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var buttonString = `<a class="btn-common-play-game-lg" style="padding:0;"> <span class="icon-play-game"></span> </a> <style>.thumbnail-2d-container img.loading {opacity: 1 !important;} .grid-item-container{align-items: start;}</style>`
    console.log("pbgc",setInterval(function() {
        for (let gCard of document.querySelectorAll(".game-card-container:not(.hasBtn)")) {
            let href =  gCard.querySelector(".game-card-link").href;
            let gameId = href.includes("PlaceId=") ? href.split("PlaceId=")[1].split("&")[0] : href.split("/")[4].split("&")[0]
            let div = document.createElement("DIV")
            div.id = "MultiplayerVisitButton"
            div.className="VisitButton VisitButtonPlayGLI"
            div.onclick=function(){Roblox.GameLauncher.joinMultiplayerGame(gameId)}
            div.style="position: absolute;z-index: 999;opacity: 0.5;"
            div.innerHTML = buttonString
            gCard.insertBefore(div,gCard.firstChild)
            gCard.classList.add("hasBtn")
            if (gCard.querySelector("img")) {
                gCard.querySelector("img").style.opacity = "1"
            }
        }
    },1000))
})();
