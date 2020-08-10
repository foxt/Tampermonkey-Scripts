// ==UserScript==
// @name         autosell trading cards
// @namespace    http://thelmgn.com/
// @version      0.1
// @description  A thing.
// @author       theLMGN
// @match        https://steamcommunity.com/id/LMGN/inventory?modal=1&market=1
// @grant        none
// ==/UserScript==

function sell() {
    document.querySelector(".itemHolder a").click()
    setTimeout(function(){
        var price = document.querySelector(".item_market_actions > div > div:nth-child(2)").innerHTML
        price = price.split("<br>")[0]
        price = price.split("Starting at: £")[1]
        console.log(price)
        SellCurrentSelection()
        setTimeout(function(){
            document.querySelector("#market_sell_buyercurrency_input").value = price
            document.querySelector("#market_sell_currency_input").value = new Number(price) - 0.02
            document.querySelector("#market_sell_dialog_accept_ssa").checked = true
            document.querySelector("#market_sell_dialog_accept").click()
            setTimeout(function() {
                document.querySelector("#market_sell_dialog_ok").click()
                setTimeout(sell,3000)
            },100)
        },100)
    },3000)
}
setTimeout(sell,3000)