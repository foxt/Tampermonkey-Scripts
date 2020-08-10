// ==UserScript==
// @name         PiHole+
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  More Options for PiHole
// @author       theLMGN
// @match        http://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
(function(){
    var configValues = {
        "boxedBG": {
            type: "text",
            default: "url(/admin/img/boxed-bg.jpg) repeat fixed",
            friendly: "CSS Background in Boxed mode",
            onUpdate: function(a){}
        }
    }

    function configLoader() {
        for (var config in configValues) {
            configValues[config].value = GM_getValue(config,configValues[config].default)
        }
        console.log(configValues)
    }
    configLoader()

    var modules = {
        boxedBG: function() {
             document.body.style.background = configValues["boxedBG"].value
            configValues["boxedBG"].onUpdate = function() {
                document.body.style.background = configValues["boxedBG"].value
            }
        },
        config: function() {
            if (document.location.pathname == "/admin/settings.php") {
                document.querySelector("body > div.wrapper > div.content-wrapper > section > div.row.justify-content-md-center > div > div > ul").innerHTML = document.querySelector("body > div.wrapper > div.content-wrapper > section > div.row.justify-content-md-center > div > div > ul").innerHTML + `<li><a data-toggle="tab" href="#plus" >PiHole+</a></li>`
                document.querySelector(".tab-content").innerHTML = document.querySelector(".tab-content").innerHTML + `<div id="plus" class="tab-pane fade">
<div class="row">
<div class="col-md-12">
<form role="form" method="post">
<div class="box box-success">
<div class="box-header with-border">
<h3 class="box-title">PiHole+ Settings</h3>
<div id="phplus_configContainer"></div>
</div>
</div>
</form>
</div>
</div>
</div>`
                for (var configValue in configValues) {
                    var config = configValues[configValue]
                    document.querySelector("#phplus_configContainer").innerHTML = document.querySelector("#phplus_configContainer").innerHTML + `${config.friendly}<br><input type="${config.type}" value="${config.value}" id="phplus_config_${configValue}" style="width:100%"></input><br>`
                }
                setInterval(function() {
                    for (var configValue in configValues) {
                        var config = configValues[configValue]
                        configValues[configValue].value = document.querySelector(`#phplus_config_${configValue}`).value
                        config.onUpdate()
                    }
                },15)
            } else {
                throw new Error("Not a config page!")
            }
        },
    }
    try {
        if (document.querySelector("body > div.wrapper > header > a > span.logo-lg").innerText == "Pi-hole" && document.querySelector("body > div.wrapper > header > a").href == "http://pi-hole.net/") {
            for (var module in modules) {
                try {
                    console.log("[PH+] Loading",module,modules[module])
                    modules[module]()
                }catch(e) {console.log("[PH+] Error loading",module,e)}
            }
        }
    } catch(e) {}
})()