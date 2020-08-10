// ==UserScript==
// @name         Video Downloader
// @namespace    http://thelmgn.com/
// @version      0.1
// @description  Add "#downloadVideo" to the end of the page url to download
// @author       theLMGN
// @match        *://*/*
// ==/UserScript==
function go() {
    if (location.hash == "#downloadVideo") {
        setInterval(function() {
            for (var elem of document.querySelectorAll("*")) {
                if (elem.nodeName == "VIDEO" && !elem.src.toString().startsWith("blob:")) {
                    elem.controls = true
                    elem.nodownload = ""
                    elem.controlslist = ""
                    elem.style.visibility = "visible"
                    elem.style.pointerEvents = "auto"
                } else {
                    elem.style.visibility = "hidden"
                    elem.style.pointerEvents = "none"
                }
            }
        })
        alert("Right click > Save Video As to download")
    }
}
go()
var oldHash = location.hash
setInterval(function() {
    if (location.hash != oldHash) {
        go()
        oldHash = location.hash
    }
})
