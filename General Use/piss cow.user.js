// ==UserScript==
// @name         piss cow
// @namespace    http://thelmgn.net/
// @version      0.1
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

function textNodesUnder(el){
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()) a.push(n);
  return a;
}
function owoify(text) {
    // OwO's stolen from Nepeta (https://github.com/Nepeta/OwO/blob/master/Tweak/Tweak.xm)
    if (text.endsWith("​​​​​​​​​​​")) { return text }
    var owoed = text.replace(/moobloom/g,"pisscow").replace(/Moobloom/g,"Pisscow").replace(/MOOBLOOM/g,"PISSCOW")
    if (owoed != text) {
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