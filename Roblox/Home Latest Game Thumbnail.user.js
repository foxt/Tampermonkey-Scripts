// ==UserScript==
// @name         Home Latest Game Thumbnail
// @namespace    http://thelmgn.com/
// @version      0.1
// @description  Replaces the background of the Roblox home page with the thumbnails of the latest game you played.
// @author       theLMGN
// @match        https://roblox.com/home
// @match        http://roblox.com/home
// @match        https://www.roblox.com/home
// @match        http://www.roblox.com/home
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    function sleep(t){return new Promise(function(a){setTimeout(a,t)})}
    // create backdrop
    var div = document.createElement("DIV")
    div.style = "position: fixed; width: 100vw; height: 100vh; z-index: -1; top: 0px; left: 0px;background-position: center;background-size: cover;filter: blur(15px);opacity: 0.5;background-image:url(\"" + localStorage.getItem("backgroundCached") + "\");"
    document.body.appendChild(div)

    // remove overlays
    var el= document.createElement('style');
    el.type= "text/css";
    el.appendChild(document.createTextNode("#container-main,.content { background: transparent !important; }"))
    console.log(el)
    return document.getElementsByTagName('head')[0].appendChild(el);


    // fetch recents sort token
    console.log("Fetching home sorts")
    var fHS = await fetch("https://games.roblox.com/v1/games/sorts?gameSortsContext=HomeSorts", {credentials: "include"})
    var hs = await fHS.json()
    var hsTkn = hs.sorts[0].token
    console.log("Token of first home sort is ", hsTkn)

    // fetch last played game
    var fLPG = await fetch("https://games.roblox.com/v1/games/list?maxRows=1&sortPosition=1&sortToken=" + hsTkn,{credentials: "include"})
    var lpg = await fLPG.json()
    var lpgId = lpg.games[0].placeId
    console.log("Last played game was ", lpgId, lpg.games[0].name)

    // fetch thumbs
    var f = await fetch("https://www.roblox.com/games/" + lpgId + "/game")
    var t = await f.text()
    t = t.replace(/"/g,"").replace(/'/g,"")
    var s = t.split("<img class=carousel-thumb src=")
    s.shift()
    var images = []
    for (var i of s) {
        images.push(i.split(">")[0])
    }
    console.log("Carousel Images: ",images)

    // change backdrop
    localStorage.setItem("backgroundCached",images[0])
    div.style.backgroundImage = "url(\"" + images[0] + "\")"
})();
