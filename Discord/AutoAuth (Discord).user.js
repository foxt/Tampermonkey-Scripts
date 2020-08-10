// ==UserScript==
// @name         AutoAuth (Discord)
// @namespace    http://thelmgn.com/
// @version      0.1
// @description  Automatically auths chosen client IDs.
// @author       theLMGN
// @match        https://discordapp.com/oauth2/authorize*
// @grant        none
// ==/UserScript==

var autoAuth = [
    264434993625956352 //dbl
]

var cid = parseInt(location.search.split("client_id=")[1].split("&")[0])
console.log("CLIENT ID:",cid)
if (cid && !isNaN(cid) && autoAuth.includes(cid)) {
    var int = setInterval(function() {
        document.querySelector("button.button-38aScr:nth-child(2)").click()
        document.body.style.filter = "blur(1em)"
        clearInterval(int)
    })
}