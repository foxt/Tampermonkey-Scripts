// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://swissgameguides.com/maps/forza_horizon_4/world/interactive_map.html
// @grant        none
// ==/UserScript==

window.player = L.marker([0,0], {icon: icon_showcase}).addTo(map)
window.pxo = 1.55
window.pyo = 1.57
;(async function() {
    setInterval(async function() {
        var ftch = await fetch("http://localhost:8080/forza")
        var j = await ftch.json()
        var x = j[2]["PositionX"]
        var y = j[2]["PositionZ"]

        y = -y

        x /= pxo
        y /= pyo

        x += 4470
        y += 3650
        console.log(x,y)
        player.setLatLng([y,x])
    },1000)
})()