// ==UserScript==
// @name            Translate
// @namespace       http://thelmgn.com/
// @description     Context menu to translate text
// @version         0.1
// @author          theLMGN
// @include         *
// @grant           GM_xmlhttpRequest
// @run-at          context-menu
// ==/UserScript==]


// A lot of code copied from https://github.com/hua1995116/google-translate-open-api
// Cheers!

(function() {
    'use strict';



    // Set this to your language code.
    var LANGUAGE = "en";







    if (!window.getSelection) {alert("Update your browser.")}
    var selection = window.getSelection()
    var fmt = "text"
    var txt = selection.focusNode.textContent
    var elm = selection.focusNode
    if (!selection || !selection.focusNode || !selection.focusNode.textContent) {
       fmt = "html"
        elm = elm.parentElement
        txt = elm.innerHTML
    }

    console.log("Translate","Select",selection)



    /**
 * Last update: 2016/06/26
 * https://translate.google.com/translate/releases/twsfe_w_20160620_RC00/r/js/desktop_module_main.js
 *
 * Everything between 'BEGIN' and 'END' was copied from the url above.
 * fork from https://github.com/vitalets/google-translate-token
 * for support brower
 */


    function sM(a) {
        var b;
        if (null !== yr)
            b = yr;
        else {
            b = wr(String.fromCharCode(84));
            var c = wr(String.fromCharCode(75));
            b = [b(), b()];
            b[1] = c();
            b = (yr = window[b.join(c())] || "") || ""
        }
        var d = wr(String.fromCharCode(116))
        , c = wr(String.fromCharCode(107))
        , d = [d(), d()];
        d[1] = c();
        c = "&" + d.join("") + "=";
        d = b.split(".");
        b = Number(d[0]) || 0;
        for (var e = [], f = 0, g = 0; g < a.length; g++) {
            var l = a.charCodeAt(g);
            128 > l ? e[f++] = l : (2048 > l ? e[f++] = l >> 6 | 192 : (55296 == (l & 64512) && g + 1 < a.length && 56320 == (a.charCodeAt(g + 1) & 64512) ? (l = 65536 + ((l & 1023) << 10) + (a.charCodeAt(++g) & 1023),
            e[f++] = l >> 18 | 240,
            e[f++] = l >> 12 & 63 | 128) : e[f++] = l >> 12 | 224,
                                                                        e[f++] = l >> 6 & 63 | 128),
                                    e[f++] = l & 63 | 128)
        }
        a = b;
        for (f = 0; f < e.length; f++)
            a += e[f],
                a = xr(a, "+-a^+6");
        a = xr(a, "+-3^+b+-f");
        a ^= Number(d[1]) || 0;
        0 > a && (a = (a & 2147483647) + 2147483648);
        a %= 1E6;
        return c + (a.toString() + "." + (a ^ b))
    }

    var yr = null;
    var wr = function(a) {
        return function() {
            return a
        }
    }
    , xr = function(a, b) {
        for (var c = 0; c < b.length - 2; c += 3) {
            var d = b.charAt(c + 2)
            , d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d)
            , d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
            a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d
        }
        return a
    };

    // END
    /* eslint-enable */


    function updateTKK() {
        return new Promise(function (resolve, reject) {
            var now = Math.floor(Date.now() / 3600000);

            if (Number(window.TKK.split('.')[0]) === now) {
                resolve();
            } else {
                GM_xmlhttpRequest({
                    url: 'https://translate.google.com',
                    onload: function (res) {
                        var matches = res.responseText.match(/tkk:\s?'(.+?)'/i);
                        console.log("Translate","TKK",matches)
                        if (matches) {
                            window.TKK = matches[1];
                        }

                        resolve();
                    },
                    onerror: function (err) {
                        var e = new Error();
                        e.code = 'BAD_NETWORK';
                        e.message = err.message;
                        reject(e);
                    }
                })
            }
        });
    }
    function getTkn(text,) {
        return updateTKK().then(function () {
            var tk = sM(text);
            tk = tk.replace('&tk=', '');
            return {name: 'tk', value: tk};
        }).catch(function (err) {
            throw err;
        });
    }
    ;(async function() {
        if (!window.TKK) {window.TKK = ""}
         var tkn = await getTkn(txt)
         console.log("Translate","Token",tkn)
        const query = {
            anno: 3,
            client: "webapp",
            format: fmt,
            v: 1.0,
            key: null,
            logld: "vTE_20190506_00",
            sl: 'auto',
            tl: LANGUAGE,
            hl: 'zh-CN',
            sp: "nmt",
            tc: 2,
            sr: 1,
            tk: tkn.value,
            mode: 1
        };

        const headers = {
            "content-type": "application/x-www-form-urlencoded",
            "Accept": "application/json, text/plain, */*",
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent':navigator.userAgent
        }
        var pma = []
        for (var k in query) {pma.push(encodeURIComponent(k) + "=" + encodeURIComponent(query[k]))}


        const options = {
            method: "POST",
            headers,
            data: "q=" + encodeURIComponent(txt),
            url: `https://translate.google.com/translate_a/t?` + pma.join("&"),
            onerror: console.error,
            onload: function(res) {
                console.log("Translate","data",res.responseText)
                var j = JSON.parse(res.responseText)

                if (elm.innerHTML) {
                    console.log(j[0])
                    elm.innerHTML = j[0]
                } else {
                    elm.textContent = j[0]
                }
            }

        };
        console.log("Translate","reqopts",options)

        GM_xmlhttpRequest(options)

    })()




})();