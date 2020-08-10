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
    var buttonString = `<div id="MultiplayerVisitButton" class="VisitButton VisitButtonPlayGLI" onclick="Roblox.GameLauncher.joinMultiplayerGame(gameId)" style="position: absolute;z-index: 999;opacity: 0.5;"><a class="btn-common-play-game-lg" style="padding:0;"> <span class="icon-play-game"></span> </a></div> <style>.thumbnail-2d-container img.loading {opacity: 1 !important;}</style>`
    console.log("pbgc",setInterval(function() {
        for (var gCard of document.querySelectorAll(".game-card-container")) {
            var gameId = gCard.querySelector(".game-card-link").href.split("PlaceId=")[1].split("&")[0]
            if (!gCard.innerHTML.includes(buttonString.replace("gameId",gameId))) {
                gCard.innerHTML = buttonString.replace("gameId",gameId) + gCard.innerHTML
            }
            if (gCard.querySelector("img")) {
                gCard.querySelector("img").style.opacity = "1"
            }
        }
    },5000))
})();