// ==UserScript==
// @name         RoStats
// @namespace    https://rostats.thelmgn.com/
// @version      0.1
// @description  A thing.
// @author       theLMGN
// @match        *://*.roblox.com/games/*
// @run-at        document-end
// @grant        none
// ==/UserScript==

document.querySelector(".section.game-about-container").innerHTML += `
<div class="section game-about-container"><div class="container-header"><h3>Players over time</h3></div><div class="section-content remove-panel">
<iframe src="https://rostats.thelmgn.com/game/embed.html#${document.querySelector("#game-detail-page").dataset.placeId}" style="width: 100%;border:none" height="330" scrolling="no" allowTransparency="true" border="no"></iframe>
</div></div>
`