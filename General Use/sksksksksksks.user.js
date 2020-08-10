// ==UserScript==
// @name         sksksksksksks
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

function getTextNodesIn(elem, opt_fnFilter) {
    var textNodes = [];
    if (elem) {
        for (var nodes = elem.childNodes, i = nodes.length; i--;) {
            var node = nodes[i], nodeType = node.nodeType;
            if (nodeType == 3) {
                if (!opt_fnFilter || opt_fnFilter(node, elem)) {
                    textNodes.push(node);
                }
            }
            else if (nodeType == 1 || nodeType == 9 || nodeType == 11) {
                textNodes = textNodes.concat(getTextNodesIn(node, opt_fnFilter));
            }
        }
    }
    return textNodes;
}
function bruh() {
var nodes = getTextNodesIn(document.body)
console.log(nodes)
    var sk = false // s/k
    for (var node of nodes) {
        console.log(node)
        var t = ""
        for (var a of node.data.split("")) {
            if (a.charCodeAt() < 123 && a.charCodeAt() > 64) {
                if (a.charCodeAt() > 90) {
                	t += sk ? "s" : "k"
                } else {
                	t += sk ? "S" : "K"

                }

                sk = !sk
            } else {
                t += a
            }

        }
        node.data = t
    }
}
bruh()
setInterval(bruh,1000)
