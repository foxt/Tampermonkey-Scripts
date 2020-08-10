// ==UserScript==
// @name         Live update visit count
// @namespace    http://thelmgn.com/
// @version      0.1
// @description  A thing.
// @author       theLMGN
// @match        https://www.roblox.com/games/*
// @grant        GM.xmlHttpRequest
// ==/UserScript==

setInterval(function() {
    try { document.querySelector("#about > div.section.game-about-container > div.section-content > ul > li:nth-child(3) > p.text-lead").innerText = document.querySelector("#about > div.section.game-about-container > div.section-content > ul > li:nth-child(3) > p.text-lead").title } catch(e) {}
})
setInterval(function() {
    GM.xmlHttpRequest({
        url: location.href, // Request current page.
        method: 'GET', // get lol
        timeout: 10*1000,
        onload: function(response) {
            if (response.status == 200) {
                var text = response.responseText
                text = text.split("Visits<p class=text-lead title=")[1].split(">")[0]
                console.log("Updated visit count to ", text)
                document.querySelector("#about > div.section.game-about-container > div.section-content > ul > li:nth-child(3) > p.text-lead").title = text
                document.querySelector("#about > div.section.game-about-container > div.section-content > ul > li:nth-child(3) > p.text-lead").style.transition = "0s all"
                document.querySelector("#about > div.section.game-about-container > div.section-content > ul > li:nth-child(3) > p.text-lead").style.filter = "invert(100%)"
                setTimeout(function() {
                    document.querySelector("#about > div.section.game-about-container > div.section-content > ul > li:nth-child(3) > p.text-lead").style.transition = "0.25s all"
                document.querySelector("#about > div.section.game-about-container > div.section-content > ul > li:nth-child(3) > p.text-lead").style.filter = ""
                },30)

            } else {
                console.log("Error updating the visit count...")
            }
        }
    })
},30000)