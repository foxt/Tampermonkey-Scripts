// ==UserScript==
// @name         Show BeatSaver key on ScoreSaber
// @namespace    http://thelmgn.com/
// @version      0.3
// @description  try to take over the world!
// @author       Leo Nesfield (theLMGN)
// @match        https://scoresaber.com/leaderboard/*
// @run-at       document-end
// @downloadURL  https://gist.githubusercontent.com/theLMGN/369eaee937dfe3b87a414b25faadfbe8/raw/scoresaber_buttons.user.js
// @updateURL    https://gist.githubusercontent.com/theLMGN/369eaee937dfe3b87a414b25faadfbe8/raw/scoresaber_buttons.user.js
// @connect      beatsaver.com
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    var songHash = document.querySelector(".box > b").innerText
    var box = document.querySelector(".box")
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://beatsaver.com/api/search/text/0?q=" + encodeURIComponent(songHash),
        responseType: "json",
        onload: function(data) {
            console.log(data)
            var item = data.response.docs[0]
            if (!item) { return box.innerHTML += "<br>Not on BeatSaver!" }
            box.innerHTML += `Key: <a href="https://beatsaver.com/beatmap/${item.key}"><b>${item.key}</b></a><br><a href="beatsaver://${item.key}" class="button is-primary"  style="color: #fff;">One click install</a> <a style="color: #363636;" class="button" href="https://beatsaver.com${item.directDownload}">Download</a>`
        }
    })
})();