// ==UserScript==
// @name         OwO
// @namespace    http://thelmgn.net/
// @version      0.1
// @description  OwO'ifies the web!
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

function textNodesUnder(el){
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()) a.push(n);
  return a;
}
var prefixes = ["OwO ", "H-hewwo?? ", "Huohhhh. ", "Haiiii! ", "UwU ", "OWO ", "HIIII! ", "<3 "]
var suffixes = [" :3", " UwU", " ʕʘ‿ʘʔ", " >_>", " ^_^", "..", " Huoh.", " ^-^", " ;_;", " ;-;", " xD", " x3", " :D", " :P", " ;3", " XDDD", ", fwendo", " ㅇㅅㅇ", " (人◕ω◕)", "（＾ｖ＾）", " Sigh.", " >_<"]

function owoify(text) {
    // OwO's stolen from Nepeta (https://github.com/Nepeta/OwO/blob/master/Tweak/Tweak.xm)
    if (text.endsWith("​​​​​​​​​​​")) { return text }
    var owoed = text.replace(/r/g,"w")
    .replace(/R/g,"W")
    .replace(/L/g,"W")
    .replace(/ow/g,"OwO")
    .replace(/no/g,"nu")
    .replace(/has/g, "haz")
    .replace(/have/g,"haz")
    .replace(/you/g,"uu")
    .replace(/the /g,"da ")
    if (owoed != text) {
        var suffix = suffixes[Math.floor(Math.random()*suffixes.length)];
        var prefix = prefixes[Math.floor(Math.random()*prefixes.length)];
        owoed = prefix + owoed + suffix + "​​​​​​​​​​​"
    }
    return owoed
}

function owo() {
    var texts = textNodesUnder(document.body)
    for (var text of texts)  {
        if (text.parentElement.tagName != "STYLE" &&
            text.parentElement.tagName != "SCRIPT" &&
            text.parentElement.tagName != "TEXTAREA" &&
            text.parentElement.tagName != "INPUT") {
            text.data = owoify(text.data)
        }
    }
}

(function() {
    'use strict';

    owo()
    setInterval(owo, 1000)
})();