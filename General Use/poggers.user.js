// ==UserScript==
// @name         poggers
// @namespace    http://thelmgn.com/
// @version      0.1
// @description  Poggers
// @author       thelmgn
// @match        *://*/*
// @grant        none
// ==/UserScript==

function textNodesUnder(el){
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()) a.push(n);
  return a;
}


function owo() {
    var texts = textNodesUnder(document.body)
    for (var text of texts)  {
        if (text.parentElement.tagName != "STYLE" &&
            text.parentElement.tagName != "SCRIPT" &&
            text.parentElement.tagName != "TEXTAREA" &&
            text.parentElement.tagName != "INPUT") {
            text.data = "poggers".substr(0,text.data.replace(/\W/g, '').length)
        }
    }
    for (var img of document.querySelectorAll("img")) {
         img.src = "https://cdn.discordapp.com/emojis/402893095600914443.png"
        img.srcset = "https://cdn.discordapp.com/emojis/402893095600914443.png 1x"
    }
    for (var img of document.querySelectorAll("source")) {
         img.src = "https://cdn.discordapp.com/emojis/402893095600914443.png"
        img.srcset = "https://cdn.discordapp.com/emojis/402893095600914443.png 1x"
    }
    for (var elem of document.querySelectorAll("*")) {
        if (elem.style.backgroundImage) {
            elem.style.backgroundImage = "url(https://cdn.discordapp.com/emojis/402893095600914443.png)"
        }
    }
}

(function() {
    'use strict';

    owo()
    setInterval(owo, 1000)
})();