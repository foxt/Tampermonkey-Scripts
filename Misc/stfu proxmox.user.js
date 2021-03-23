// ==UserScript==
// @name         stfu proxmox
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    if (Ext.Msg && Ext.Msg.show) {
        Ext.Msg.show = function(a) {
            if (a.title == "No valid subscription") {
                return
            };
            console.log(a)
            var c=this,b;a=a||{};if(Ext.Component.layoutSuspendCount){Ext.on({resumelayouts:function(){c.show(a)},single:true});return c}c.reconfigure(a);if(a.cls){c.addCls(a.cls)}b=c.query("textfield:not([hidden]),textarea:not([hidden]),button:not([hidden])");c.preventFocusOnActivate=!b.length;c.hidden=true;Ext.window.Window.prototype.show.call(this);return c
        }
    }
})();