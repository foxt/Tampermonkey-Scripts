// ==UserScript==
// @name         Better Server Selector
// @namespace    http://thelmgn.com/
// @version      0.1
// @description  Right click the play button on a Roblox game page
// @author       theLMGN
// @match        https://www.roblox.com/games/*
// @grant        none
// ==/UserScript==


//?placeId=414300524&startIndex=0&_=1534445474777
(async function() {
    'use strict';
    try {
        document.querySelector("#MultiplayerVisitButton > a").style.filter = "invert(100%)"
        var placeID = document.querySelector("#game-detail-page").dataset.placeId
        var instances = []
        function makeRequest(page) {
            return new Promise(function(a,r) {
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        a(JSON.parse(xhttp.responseText))
                    } else if (this.readyState == 4) {
                        r()
                    }
                };
                xhttp.open("GET","https://www.roblox.com/games/getgameinstancesjson?placeId=" + placeID + "&startIndex=" + page, true);
                xhttp.send();
            })
        }
        (async function() {
            var start = performance.now()
            var pageOne = await makeRequest(0)
            instances = pageOne.Collection
            var done = pageOne.TotalCollectionSize
            var doone = pageOne.Collection.length
            var i = 1
            //console.log(done)
            while (done > 0) {
                //console.log(doone,done)
                var page = await makeRequest(doone)

                instances = instances.concat(page.Collection)
                done = done - page.Collection.length
                doone = doone + page.Collection.length
                var eta = Math.floor((((performance.now() - start) / doone) * done) / 1000) + 1
                document.querySelector("#game-detail-page > div.col-xs-12.section-content.game-main-content > div.game-calls-to-action > div.game-buttons-container > ul > li.social-media-share > div").innerText = `Still loading ${Math.floor((doone / page.TotalCollectionSize) * 100)}% (eta. ${Math.floor(eta)}s)`
                i = i + 1
                 if (page.Collection.length == 0) {
                    done = -1
                }
            }
            document.querySelector("#game-detail-page > div.col-xs-12.section-content.game-main-content > div.game-calls-to-action > div.game-buttons-container > ul > li.social-media-share > div").innerText = "Right click the play button for more options"
        })()

        //console.log(instances)

        var playButton = document.querySelector("#MultiplayerVisitButton")
        document.querySelector("#MultiplayerVisitButton > a").style.filter = ""
        playButton.addEventListener('contextmenu', function(ev) {
            instances = instances.filter(function(a) {
                return a.CurrentPlayers.length
            })
            var bestForPing = instances.sort(function(a,b) {
                return a.Ping - b.Ping
            })[0]
            var leastPlayers = instances.sort(function(a,b) {
                return a.CurrentPlayers.length - b.CurrentPlayers.length
            })[0]
            var mostPlayers = instances.sort(function(a,b) {
                return b.CurrentPlayers.length - a.CurrentPlayers.length
            })[0]
            var p = 0
            for (var s of instances) {
                p += s.CurrentPlayers.length
            }
            ev.preventDefault();
            $.modal(`<a class="modalCloseImg simplemodal-close" title="Close"></a>
<div tabindex="-1" class="simplemodal-wrap" style="height: 100%; outline: 0px; width: 100%; overflow: visible;">
<div id="modal-confirmation" class="modal-confirmation need-padding simplemodal-data" data-modal-type="confirmation" style="display: block;">
<div id="modal-dialog" class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title">${instances.length} servers | ${p} players</h5>
</div>
<div class="modal-body">
</div>
<div class="modal-btns" style="padding: 1em">
<a onclick='document.querySelector("#MultiplayerVisitButton").click()' id="confirm-btn" class="btn-primary-md" style="margin: 0.1em">Default Roblox Matchmaker</a>
<a onclick='${bestForPing.JoinScript}' id="decline-btn" class="btn-control-md" style="margin: 0.1em">Lowest Ping (${Math.floor(bestForPing.Ping)}ms)</a>
<a onclick='${leastPlayers.JoinScript}'  id="decline-btn" class="btn-control-md" style="margin: 0.1em">Lowest Player Count (${leastPlayers.CurrentPlayers.length} players)</a>
<a onclick='${mostPlayers.JoinScript}'  id="decline-btn" class="btn-control-md" style="margin: 0.1em">Highest Player Count (${mostPlayers.CurrentPlayers.length} players)</a></div>

</div>
<div class="modal-footer text-footer">Press ESC to exit this modal</div>
</div>
</div>
</div>
</div>`,{opacity: 80})
            document.querySelector("#simplemodal-overlay").style.backgroundColor = "#000"
            return false;

        }, false);
    } catch(e) {
        debugger;
        console.log(e)
    }
})()