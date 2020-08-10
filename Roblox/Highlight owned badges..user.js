// ==UserScript==
// @name         Highlight owned badges.
// @namespace    http://thelmgn.com/
// @version      0.1
// @description  Highlight badges you own on Roblox
// @author       theLMGN
// @match        https://www.roblox.com/games/*
// @grant        GM_xmlHttpRequest
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

(async function() {
    'use strict';


const preferNativeXHR = true


var usingGMXHR = false //DO NOT TOUCH
function nativeXHR(url,a,r) {
     usingGMXHR = false
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:

            var html = document.createElement("html")
            html.innerHTML = xhttp.responseText
            if (html.querySelector("#item-container > div.section-content.top-section > div.item-name-container > div > div.label-checkmark")) {
                a(true)
            } else {
                a(false)
            }
        } else if (this.readyState == 4) {
            r()
        }
    };
    xhttp.open("GET",url, true);
    xhttp.send();
}
function GMXHR(url,a,r) {
    usingGMXHR = true
    GM.xmlHttpRequest({
        url: `https://api.roblox.com/ownership/hasasset?assetId=${url.split("/")[4]}&userId=${document.querySelector('meta[name="user-data"]').dataset.userid}`,
        method: 'GET',
        timeout: 10*1000,
        onload: function(response) {
            if (response.status == 200) {
                a((response.responseText == true))
            } else {r()}
        }
    })
}

function badge(url) {
    return new Promise(function (a,r) {
        if (preferNativeXHR) {
            try {
                nativeXHR(url,a,r)
            } catch(e) {
                GMXHR(url,a,r)
            }
        } else {
            try {
                GMXHR(url,a,r)
            } catch(e) {
                nativeXHR(url,a,r)
            }
        }
    })
}
function cachedBadge(url) {
    return new Promise(async function(a,r) {
        if (GM_getValue(url,false) == true) {
            a(true)
        } else {
            var check = await badge(url)
            if (check == true) {GM_setValue(url,true)}
            a(check)
        }
    })
}

async function scan() {
    try {
        var start = performance.now()
        var badgesAPI = 0
        var badgesPage = 0
        var failed = 0
        var badges = []
        for (var eee of document.querySelectorAll(`.badge-row`)) {
            badges.push(eee)
        }
        console.log(badges)
        var total = 0;
        var owned = 0;
        for (var element of badges) {
            try {
                document.querySelector(".badge-container > div > h3").innerText = `Game Badges (processed ${badgesAPI + badgesPage + failed}/${badges.length}, eta ${Math.floor((((performance.now() - start) / (badgesAPI + badgesPage + failed)) * (badges.length - (badgesAPI + badgesPage + failed))) / 1000) + 1}s)`
                element.style.transition = "0.25s all"
                element.style.filter = "saturate(2)"
                var ownsBadge = false
                if (!element.dataset.owned) {
                    ownsBadge = await badge(element.querySelector("div.badge-image > a"))
                } else {
                    ownsBadge = true
                }
                if (ownsBadge == false){
                    element.style.filter = "grayscale(100%) blur(1.5px)"
                    element.style.transform = "scale(0.75)"
                    total = total + 1;
                } else {
                    element.style.transform = "scale(1.0)"
                    element.style.filter = ""
                    element.dataset.owned = true
                    total = total + 1;
                    owned = owned + 1;
                }
                if (usingGMXHR) {
                    badgesAPI = badgesAPI + 1
                } else {
                    badgesPage = badgesPage + 1
                }
            } catch(e) {
                failed = failed + 1
            }
        }
        document.querySelector(".badge-container > div > h3").innerText = `Game Badges (you own ${owned}/${total}, ${Math.floor((owned/total) * 100)}%)`
        console.log(`%c[Badge Highlighter] Took ${Math.floor(performance.now() - start)}ms to check ${badgesAPI + badgesPage + failed} badge(s) (${Math.floor(Math.floor(performance.now() - start) / (badgesAPI + badgesPage + failed))}ms avg/badge), requested ${badgesAPI} using the API (GM.XHR), and ${badgesPage} using the normal XHR.`, "")
    } catch(e) {console.error("%cBIG FUCKEE","color:#f00;font-size:28px;",e)}
        setTimeout(scan,15000)
    }

    setInterval(function() {try {document.querySelector(".badge-container > ul:nth-child(2) > li:nth-child(4) > button:nth-child(1)").click()} catch(e){}},500)
    setTimeout(scan,1500)
})();