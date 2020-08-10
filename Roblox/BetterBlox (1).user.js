// ==UserScript==
// @name         BetterBlox
// @namespace    http://thelmgn.com/
// @version      0.3
// @description  Fixes various issues on Roblox.
// @author       theLMGN
// @match        https://www.roblox.com/*
// @grant        none
// ==/UserScript==

//CONFIG

var fixAudio = false; //Replaces the play pause button on audio pages with a full fledged audio player. BROKEN FOR NOW, DO NOT USE
var adBlock = true; //Remove ads
var declutterHamburger = false; // Declutters the left hand menu.
var blockedWordsInComments = [ //Hides comment's with certain words or phrases, or by the user
    "🍀Do you want",
    "ＳＣＡＭＭＥＲＳ",
    "scam",
    "do you want TONS OF robux?",
    "kingmehtab",
    "Wolfy_Jas",
    "skippyjoo_YT",
    "YTXOOLGAMER2",
    "gobux.me",
    "easybux.me",
    "I got thousands of ROBUX and access to EVERY Game Pass just by getting a code."
];
var removedText = true;
var removedBar = true;
var changeAccent =false; // Change the accent colour. (experimental)
var accentColour = "#FF2A2A" // Default is #00A2FF
var autoLoadMore = true; //Auto load more comments.
var showIDOnLibrary = true; // Shows an ID next to the favorite button
var logErrors = true; // Developers only
var darkMode = false; // Dark theme! (experimental)
var addGroupLinks = true; // Adds more links to group config pages.
var highlightOwnedBadges = true; // Highlights badges that you own on a games page.


//CODE

function log(m,d) {
    console.log("[BB] " + m,d);
}
function injectStyle(s) {
    document.body.innerHTML = `${document.body.innerHTML} <style>/*BetterBlox*/ ${s}</style>`
}

var removedComments = 0;
var totalComments = 0;
(function() {
    'use strict';
    var pageType = location.href.split("/")[3]
    var userId = document.querySelector("meta[name='user-data']").dataset.userid
    log("Loaded on a page of type " + pageType + " (" +location.href+ "), with userId " + userId)
    if (pageType == "library") {
        if (document.querySelector("span.field-content").innerText == "Audio" && fixAudio) {
            document.querySelector(".item-thumbnail-container").innerHTML = `${document.querySelector(".item-thumbnail-container").innerHTML} <audio controls src='https://roblox.com/asset?id=${location.href.split("/")[4]}' width="420px" style="width: 420px; min-width: 420px;" id='rblxProperAudio'></audio>`
            document.querySelector("div.MediaPlayerControls").remove()
        } else {
            log("Not Audio");
        }
        if (showIDOnLibrary) {
            document.querySelector(".favorite-button-container").innerHTML = document.querySelector(".favorite-button-container").innerHTML + " ID: " +location.href.split("/")[4]
        }
    }
    if (pageType == "games" && highlightOwnedBadges) {

    }
    if (addGroupLinks && location.href.startsWith("https://www.roblox.com/my/groupadmin.aspx?gid=")) {
        var groupID = location.href.replace("https://www.roblox.com/my/groupadmin.aspx?gid=","");
        document.querySelector(".back-to-groups").innerHTML = `<a name="ctl00$ctl00$cphRoblox$cphMyRobloxContent$BackButton" id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_BackButton" class="btn-control btn-control-medium translate" href="https://www.roblox.com/My/Groups.aspx?gid=${groupID}">View Group</a>
<a name="ctl00$ctl00$cphRoblox$cphMyRobloxContent$BackButton" id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_BackButton" class="btn-control btn-control-medium translate" href="https://www.roblox.com/Groups/Audit.aspx?groupid=${groupID}">Audit Log</a>`
    }
    if (addGroupLinks && location.href.startsWith("https://www.roblox.com/Groups/Audit.aspx?groupid=")) {
        var groupID = location.href.replace("https://www.roblox.com/Groups/Audit.aspx?groupid=","");
        document.querySelector("#AuditPage > div:nth-child(3) > h2:nth-child(1) > a:nth-child(1)").innerHTML = `<a name="ctl00$ctl00$cphRoblox$cphMyRobloxContent$BackButton" id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_BackButton" class="btn-control btn-control-medium translate" href="https://www.roblox.com/My/Groups.aspx?gid=${groupID}">View Group</a>
<a name="ctl00$ctl00$cphRoblox$cphMyRobloxContent$BackButton" id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_BackButton" class="btn-control btn-control-medium translate" href="https://www.roblox.com/my/groupadmin.aspx?gid=${groupID}">Group Config</a>`
    }
    if (adBlock) {

        document.querySelector(".abp").remove()
    }
    if (darkMode) {
        injectStyle(`body,.content,.section-content {background-color: #191919;color: #E3E3E3;}
                     .game-card-container,textarea,.form-control,.stack .stack-list .stack-row {background-color: #111;}
                     .dialog-container .dialog-body,.dialog-input-container,.rbx-left-col {background-color: #151515; border-top-color: #151515;}
                     #mCSB_1_container > ul:nth-child(1) > li > a:nth-child(1) > span:nth-child(1) {filter: invert(100%);}
                     .profile-container .asset-item {border:none;}
                     .icon-default-bc, .icon-bc, .icon-tbc, .icon-obc { background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyMC4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIxMDRweCIgaGVpZ2h0PSIxNjhweCIgdmlld0JveD0iMCAwIDEwNCAxNjgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwNCAxNjg7IiB4bWw6c3BhY2U9InByZXNlcnZlIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48c3R5bGUgaWQ9InN0eWxpc2gtMSIgY2xhc3M9InN0eWxpc2giIHR5cGU9InRleHQvY3NzIj4ubWRsLXNsaWRlciB7DQogICAgY29sb3I6ICNCNTJCMkI7DQp9DQoubWRsLXNsaWRlcjo6LW1vei1yYW5nZS1wcm9ncmVzcywubWRsLXNsaWRlcjo6LXdlYmtpdC1zbGlkZXItdGh1bWIsLm1kbC1zbGlkZXI6Oi1tb3otcmFuZ2UtdGh1bWIsLm1kbC1zbGlkZXI6Oi1tcy10aHVtYiwubWRsLXNsaWRlci1iYWNrZ3JvdW5kLWxvd2VyICB7DQogICAgYmFja2dyb3VuZDogI0I1MkIyQjsNCn08L3N0eWxlPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6I0Y2ODgwMjt9DQoJLnN0MXtmaWxsOiNGNjg4MDI7fQ0KCS5zdDJ7ZmlsbDojRjZCNzAyO30NCgkuc3Qze2ZpbGw6IzAwQTJGRjt9DQoJLnN0NHtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnIGlkPSJsYWJlbCI+DQo8L2c+DQo8ZyBpZD0iQkMiPg0KCTxnIGlkPSJPQkMtc3F1YXJlIj4NCgkJPGc+DQoJCQk8Zz4NCgkJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTksMTQ2Yy0wLjEsMC0wLjIsMC0wLjQtMC4xbC00LjYtMS44TDkuNCwxNDZjLTAuNSwwLjItMS4xLDAtMS4zLTAuNnMwLTEuMSwwLjYtMS4zbDUtMiAgICAgIGMwLjItMC4xLDAuNS0wLjEsMC43LDBsNSwyYzAuNSwwLjIsMC44LDAuOCwwLjYsMS4zQzE5LjgsMTQ1LjgsMTkuNCwxNDYsMTksMTQ2eiIvPg0KCQkJPC9nPg0KCQkJPGc+DQoJCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE5LDE1MGMtMC4xLDAtMC4yLDAtMC40LTAuMWwtNC42LTEuOEw5LjQsMTUwYy0wLjUsMC4yLTEuMSwwLTEuMy0wLjZzMC0xLjEsMC42LTEuM2w1LTIgICAgICBjMC4yLTAuMSwwLjUtMC4xLDAuNywwbDUsMmMwLjUsMC4yLDAuOCwwLjgsMC42LDEuM0MxOS44LDE0OS44LDE5LjQsMTUwLDE5LDE1MHoiLz4NCgkJCTwvZz4NCgkJCTxnPg0KCQkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOSwxNTRjLTAuMSwwLTAuMiwwLTAuNC0wLjFsLTQuNi0xLjhMOS40LDE1NGMtMC41LDAuMi0xLjEsMC0xLjMtMC42czAtMS4xLDAuNi0xLjNsNS0yICAgICAgYzAuMi0wLjEsMC41LTAuMSwwLjcsMGw1LDJjMC41LDAuMiwwLjgsMC44LDAuNiwxLjNDMTkuOCwxNTMuOCwxOS40LDE1NCwxOSwxNTR6Ii8+DQoJCQk8L2c+DQoJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMjUuNCwxNTQuMWwtMS40LTAuN1YxNDdjMC0wLjMtMC4xLTAuNS0wLjMtMC43bC0xLTFjLTAuNC0wLjQtMS0wLjQtMS40LDBzLTAuNCwxLDAsMS40bDAuNywwLjd2Ni42ICAgICBjMCwwLjQsMC4yLDAuNywwLjYsMC45bDEuNCwwLjd2MC40SDR2LTAuNGwxLjQtMC43YzAuNC0wLjIsMC42LTAuNSwwLjYtMC45di02LjZsMC43LTAuN2MwLjQtMC40LDAuNC0xLDAtMS40cy0xLTAuNC0xLjQsMGwtMSwxICAgICBDNC4xLDE0Ni41LDQsMTQ2LjcsNCwxNDd2Ni40bC0xLjQsMC43QzIuMiwxNTQuMywyLDE1NC42LDIsMTU1djJjMCwwLjYsMC40LDEsMSwxaDEuMWMwLjUsNC43LDQuNSw4LDkuOSw4czkuNC0zLjMsOS45LThIMjUgICAgIGMwLjYsMCwxLTAuNCwxLTF2LTJDMjYsMTU0LjYsMjUuOCwxNTQuMywyNS40LDE1NC4xeiBNMTQsMTY0Yy00LjMsMC03LjQtMi40LTcuOS02aDE1LjhDMjEuNCwxNjEuNiwxOC4zLDE2NCwxNCwxNjR6Ii8+DQoJCTwvZz4NCgk8L2c+DQoJPGcgaWQ9IlRCQy1zcXVhcmUiPg0KCQk8Zz4NCgkJCTxnPg0KCQkJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xOSwxMThjLTAuMSwwLTAuMiwwLTAuNC0wLjFsLTQuNi0xLjhMOS40LDExOGMtMC41LDAuMi0xLjEsMC0xLjMtMC42Yy0wLjItMC41LDAtMS4xLDAuNi0xLjNsNS0yICAgICAgYzAuMi0wLjEsMC41LTAuMSwwLjcsMGw1LDJjMC41LDAuMiwwLjgsMC44LDAuNiwxLjNDMTkuOCwxMTcuOCwxOS40LDExOCwxOSwxMTh6Ii8+DQoJCQk8L2c+DQoJCQk8Zz4NCgkJCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMTksMTIyYy0wLjEsMC0wLjIsMC0wLjQtMC4xbC00LjYtMS44TDkuNCwxMjJjLTAuNSwwLjItMS4xLDAtMS4zLTAuNmMtMC4yLTAuNSwwLTEuMSwwLjYtMS4zbDUtMiAgICAgIGMwLjItMC4xLDAuNS0wLjEsMC43LDBsNSwyYzAuNSwwLjIsMC44LDAuOCwwLjYsMS4zQzE5LjgsMTIxLjgsMTkuNCwxMjIsMTksMTIyeiIvPg0KCQkJPC9nPg0KCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTI1LjQsMTI2LjFsLTEuNC0wLjdWMTE5YzAtMC4zLTAuMS0wLjUtMC4zLTAuN2wtMS0xYy0wLjQtMC40LTEtMC40LTEuNCwwcy0wLjQsMSwwLDEuNGwwLjcsMC43djYuNiAgICAgYzAsMC40LDAuMiwwLjcsMC42LDAuOWwxLjQsMC43djAuNEg0di0wLjRsMS40LTAuN2MwLjQtMC4yLDAuNi0wLjUsMC42LTAuOXYtNi42bDAuNy0wLjdjMC40LTAuNCwwLjQtMSwwLTEuNHMtMS0wLjQtMS40LDBsLTEsMSAgICAgQzQuMSwxMTguNSw0LDExOC43LDQsMTE5djYuNGwtMS40LDAuN0MyLjIsMTI2LjMsMiwxMjYuNiwyLDEyN3YyYzAsMC42LDAuNCwxLDEsMWgxLjFjMC41LDQuNyw0LjUsOCw5LjksOHM5LjQtMy4zLDkuOS04SDI1ICAgICBjMC42LDAsMS0wLjQsMS0xdi0yQzI2LDEyNi42LDI1LjgsMTI2LjMsMjUuNCwxMjYuMXogTTE0LDEzNmMtNC4zLDAtNy40LTIuNC03LjktNmgxNS44QzIxLjQsMTMzLjYsMTguMywxMzYsMTQsMTM2eiIvPg0KCQk8L2c+DQoJPC9nPg0KCTxnIGlkPSJCQy1zcXVhcmUiPg0KCQk8Zz4NCgkJCTxnPg0KCQkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xOSw5MC4xYy0wLjEsMC0wLjIsMC0wLjQtMC4xTDE0LDg4LjJMOS40LDkwYy0wLjUsMC4yLTEuMSwwLTEuMy0wLjZzMC0xLjEsMC42LTEuM2w1LTIgICAgICBjMC4yLTAuMSwwLjUtMC4xLDAuNywwbDUsMmMwLjUsMC4yLDAuOCwwLjgsMC42LDEuM0MxOS44LDg5LjksMTkuNCw5MC4xLDE5LDkwLjF6Ii8+DQoJCQk8L2c+DQoJCQk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMjUuNCw5OC4xTDI0LDk3LjRWOTFjMC0wLjMtMC4xLTAuNS0wLjMtMC43bC0xLTFjLTAuNC0wLjQtMS0wLjQtMS40LDBzLTAuNCwxLDAsMS40bDAuNywwLjdWOTggICAgIGMwLDAuNCwwLjIsMC43LDAuNiwwLjlsMS40LDAuN3YwLjRINHYtMC40bDEuNC0wLjdDNS44LDk4LjcsNiw5OC40LDYsOTh2LTYuNmwwLjctMC43YzAuNC0wLjQsMC40LTEsMC0xLjRzLTEtMC40LTEuNCwwbC0xLDEgICAgIEM0LjEsOTAuNiw0LDkwLjgsNCw5MS4xdjYuNGwtMS40LDAuN0MyLjIsOTguMywyLDk4LjYsMiw5OXYyYzAsMC42LDAuNCwxLDEsMWgxLjFjMC41LDQuNyw0LjUsOCw5LjksOHM5LjQtMy4zLDkuOS04SDI1ICAgICBjMC42LDAsMS0wLjQsMS0xdi0yQzI2LDk4LjYsMjUuOCw5OC4zLDI1LjQsOTguMXogTTE0LDEwOGMtNC4zLDAtNy40LTIuNC03LjktNmgxNS44QzIxLjQsMTA1LjYsMTguMywxMDgsMTQsMTA4eiIvPg0KCQk8L2c+DQoJPC9nPg0KCTxnIGlkPSJPQkMtb24iPg0KCQk8Zz4NCgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03Niw3OGgyNWMwLjYsMCwxLTAuNCwxLTFWNjNjMC0wLjYtMC40LTEtMS0xSDc3djUuNmMwLDAuMywwLjEsMC41LDAuMywwLjdsMS40LDEuNCAgICAgYzAuMiwwLjIsMC4zLDAuNCwwLjMsMC43Vjc0YzAsMC42LTAuNCwxLTEsMWgtMC4zYy0wLjQsMC0wLjgsMC4zLTAuOSwwLjdMNzYsNzh6Ii8+DQoJCQk8Zz4NCgkJCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNODAuMyw2OS43YzAtMi4xLDEuMi0zLjQsMi45LTMuNGMxLjcsMCwyLjksMS4yLDIuOSwzLjRjMCwyLjEtMS4yLDMuNC0yLjksMy40UzgwLjMsNzEuOCw4MC4zLDY5Ljd6ICAgICAgIE04NC45LDY5LjdjMC0xLjUtMC43LTIuMy0xLjctMi4zcy0xLjcsMC45LTEuNywyLjNjMCwxLjUsMC43LDIuNCwxLjcsMi40Qzg0LjIsNzIuMSw4NC45LDcxLjIsODQuOSw2OS43eiIvPg0KCQkJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik04Ny4zLDY2LjVoMi4xYzEuMywwLDIuMywwLjQsMi4zLDEuNmMwLDAuNi0wLjMsMS4yLTEuMSwxLjRsMCwwYzAuOSwwLjIsMS41LDAuNywxLjUsMS41ICAgICAgYzAsMS4zLTEuMSwxLjktMi41LDEuOWgtMi4zVjY2LjV6IE04OS4zLDY5LjJjMC45LDAsMS4zLTAuMywxLjMtMWMwLTAuNi0wLjQtMC44LTEuMy0wLjhoLTAuOHYxLjhIODkuM3ogTTg5LjUsNzIuMSAgICAgIGMxLDAsMS41LTAuNCwxLjUtMS4xcy0wLjUtMS0xLjUtMWgtMXYyLjFIODkuNXoiLz4NCgkJCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNOTUuOSw2Ni4zYzAuOCwwLDEuNCwwLjQsMS45LDAuOGwtMC42LDAuN2MtMC4zLTAuMy0wLjctMC41LTEuMi0wLjVjLTEuMSwwLTEuOCwwLjktMS44LDIuNCAgICAgIHMwLjcsMi40LDEuOCwyLjRjMC42LDAsMS0wLjIsMS40LTAuNmwwLjYsMC43Yy0wLjUsMC42LTEuMiwwLjktMiwwLjljLTEuNywwLTMtMS4yLTMtMy40QzkyLjksNjcuNiw5NC4zLDY2LjMsOTUuOSw2Ni4zeiIvPg0KCQkJPC9nPg0KCQk8L2c+DQoJCTxnPg0KCQkJPGc+DQoJCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTcxLDYyYy0wLjEsMC0wLjIsMC0wLjQtMC4xTDY2LDYwLjFMNjEuNCw2MmMtMC41LDAuMi0xLjEsMC0xLjMtMC42czAtMS4xLDAuNi0xLjNsNS0yICAgICAgYzAuMi0wLjEsMC41LTAuMSwwLjcsMGw1LDJjMC41LDAuMiwwLjgsMC44LDAuNiwxLjNDNzEuOCw2MS44LDcxLjQsNjIsNzEsNjJ6Ii8+DQoJCQk8L2c+DQoJCQk8Zz4NCgkJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNzEsNjZjLTAuMSwwLTAuMiwwLTAuNC0wLjFMNjYsNjQuMUw2MS40LDY2Yy0wLjUsMC4yLTEuMSwwLTEuMy0wLjZzMC0xLjEsMC42LTEuM2w1LTIgICAgICBjMC4yLTAuMSwwLjUtMC4xLDAuNywwbDUsMmMwLjUsMC4yLDAuOCwwLjgsMC42LDEuM0M3MS44LDY1LjgsNzEuNCw2Niw3MSw2NnoiLz4NCgkJCTwvZz4NCgkJCTxnPg0KCQkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik03MSw3MGMtMC4xLDAtMC4yLDAtMC40LTAuMUw2Niw2OC4xTDYxLjQsNzBjLTAuNSwwLjItMS4xLDAtMS4zLTAuNnMwLTEuMSwwLjYtMS4zbDUtMiAgICAgIGMwLjItMC4xLDAuNS0wLjEsMC43LDBsNSwyYzAuNSwwLjIsMC44LDAuOCwwLjYsMS4zQzcxLjgsNjkuOCw3MS40LDcwLDcxLDcweiIvPg0KCQkJPC9nPg0KCQkJPHBhdGggY2xhc3M9InN0MSIgZD0iTTc3LjQsNzAuMUw3Niw2OS40VjYzYzAtMC4zLTAuMS0wLjUtMC4zLTAuN2wtMS0xYy0wLjQtMC40LTEtMC40LTEuNCwwcy0wLjQsMSwwLDEuNGwwLjcsMC43VjcwICAgICBjMCwwLjQsMC4yLDAuNywwLjYsMC45bDEuNCwwLjdWNzJINTZ2LTAuNGwxLjQtMC43YzAuMy0wLjIsMC42LTAuNSwwLjYtMC45di02LjZsMC43LTAuN2MwLjQtMC40LDAuNC0xLDAtMS40cy0xLTAuNC0xLjQsMGwtMSwxICAgICBDNTYuMSw2Mi41LDU2LDYyLjcsNTYsNjN2Ni40bC0xLjQsMC43QzU0LjIsNzAuMyw1NCw3MC42LDU0LDcxdjJjMCwwLjYsMC40LDEsMSwxaDEuMWMwLjUsNC43LDQuNSw4LDkuOSw4czkuNC0zLjMsOS45LThINzcgICAgIGMwLjYsMCwxLTAuNCwxLTF2LTJDNzgsNzAuNiw3Ny44LDcwLjMsNzcuNCw3MC4xeiBNNjYsODBjLTQuMywwLTcuNC0yLjQtNy45LTZoMTUuOEM3My40LDc3LjYsNzAuMyw4MCw2Niw4MHoiLz4NCgkJPC9nPg0KCTwvZz4NCgk8ZyBpZD0iT0JDIj4NCgkJPGc+DQoJCQk8Zz4NCgkJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjguMyw2OS43YzAtMi4xLDEuMi0zLjQsMi45LTMuNHMyLjksMS4yLDIuOSwzLjRjMCwyLjEtMS4yLDMuNC0yLjksMy40UzI4LjMsNzEuOCwyOC4zLDY5Ljd6IE0zMi45LDY5LjcgICAgICBjMC0xLjUtMC43LTIuMy0xLjctMi4zcy0xLjcsMC45LTEuNywyLjNjMCwxLjUsMC43LDIuNCwxLjcsMi40UzMyLjksNzEuMiwzMi45LDY5Ljd6Ii8+DQoJCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTM1LjMsNjYuNWgyLjFjMS4zLDAsMi4zLDAuNCwyLjMsMS42YzAsMC42LTAuMywxLjItMS4xLDEuNGwwLDBjMC45LDAuMiwxLjUsMC43LDEuNSwxLjUgICAgICBjMCwxLjMtMS4xLDEuOS0yLjUsMS45aC0yLjNWNjYuNXogTTM3LjMsNjkuMmMwLjksMCwxLjMtMC4zLDEuMy0xYzAtMC42LTAuNC0wLjgtMS4zLTAuOGgtMC44djEuOEgzNy4zeiBNMzcuNSw3Mi4xICAgICAgYzEsMCwxLjUtMC40LDEuNS0xLjFzLTAuNS0xLTEuNS0xaC0xdjIuMUgzNy41eiIvPg0KCQkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00My45LDY2LjNjMC44LDAsMS40LDAuNCwxLjksMC44bC0wLjYsMC43Yy0wLjMtMC4zLTAuNy0wLjUtMS4yLTAuNWMtMS4xLDAtMS44LDAuOS0xLjgsMi40ICAgICAgczAuNywyLjQsMS44LDIuNGMwLjYsMCwxLTAuMiwxLjQtMC42bDAuNiwwLjdjLTAuNSwwLjYtMS4yLDAuOS0yLDAuOWMtMS43LDAtMy0xLjItMy0zLjRDNDAuOSw2Ny42LDQyLjMsNjYuMyw0My45LDY2LjN6Ii8+DQoJCQk8L2c+DQoJCQk8Zz4NCgkJCQk8cGF0aCBjbGFzcz0ic3QxIiBkPSJNNDksNzhIMjdjLTAuNiwwLTEtMC40LTEtMXMwLjQtMSwxLTFoMjFWNjRIMjdjLTAuNiwwLTEtMC40LTEtMXMwLjQtMSwxLTFoMjJjMC42LDAsMSwwLjQsMSwxdjE0ICAgICAgQzUwLDc3LjYsNDkuNiw3OCw0OSw3OHoiLz4NCgkJCTwvZz4NCgkJPC9nPg0KCQk8Zz4NCgkJCTxnPg0KCQkJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xOSw2MmMtMC4xLDAtMC4yLDAtMC40LTAuMUwxNCw2MC4xTDkuNCw2MmMtMC41LDAuMi0xLjEsMC0xLjMtMC42czAtMS4xLDAuNi0xLjNsNS0yICAgICAgYzAuMi0wLjEsMC41LTAuMSwwLjcsMGw1LDJjMC41LDAuMiwwLjgsMC44LDAuNiwxLjNDMTkuOCw2MS44LDE5LjQsNjIsMTksNjJ6Ii8+DQoJCQk8L2c+DQoJCQk8Zz4NCgkJCQk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMTksNjZjLTAuMSwwLTAuMiwwLTAuNC0wLjFMMTQsNjQuMUw5LjQsNjZjLTAuNSwwLjItMS4xLDAtMS4zLTAuNnMwLTEuMSwwLjYtMS4zbDUtMiAgICAgIGMwLjItMC4xLDAuNS0wLjEsMC43LDBsNSwyYzAuNSwwLjIsMC44LDAuOCwwLjYsMS4zQzE5LjgsNjUuOCwxOS40LDY2LDE5LDY2eiIvPg0KCQkJPC9nPg0KCQkJPGc+DQoJCQkJPHBhdGggY2xhc3M9InN0MCIgZD0iTTE5LDcwYy0wLjEsMC0wLjIsMC0wLjQtMC4xTDE0LDY4LjFMOS40LDcwYy0wLjUsMC4yLTEuMSwwLTEuMy0wLjZzMC0xLjEsMC42LTEuM2w1LTIgICAgICBjMC4yLTAuMSwwLjUtMC4xLDAuNywwbDUsMmMwLjUsMC4yLDAuOCwwLjgsMC42LDEuM0MxOS44LDY5LjgsMTkuNCw3MCwxOSw3MHoiLz4NCgkJCTwvZz4NCgkJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yNS40LDcwLjFMMjQsNjkuNFY2M2MwLTAuMy0wLjEtMC41LTAuMy0wLjdsLTEtMWMtMC40LTAuNC0xLTAuNC0xLjQsMHMtMC40LDEsMCwxLjRsMC43LDAuN1Y3MCAgICAgYzAsMC40LDAuMiwwLjcsMC42LDAuOWwxLjQsMC43VjcySDR2LTAuNGwxLjQtMC43QzUuOCw3MC43LDYsNzAuNCw2LDcwdi02LjZsMC43LTAuN2MwLjQtMC40LDAuNC0xLDAtMS40cy0xLTAuNC0xLjQsMGwtMSwxICAgICBDNC4xLDYyLjUsNCw2Mi43LDQsNjN2Ni40bC0xLjQsMC43QzIuMiw3MC4zLDIsNzAuNiwyLDcxdjJjMCwwLjYsMC40LDEsMSwxaDEuMWMwLjUsNC43LDQuNSw4LDkuOSw4czkuNC0zLjMsOS45LThIMjUgICAgIGMwLjYsMCwxLTAuNCwxLTF2LTJDMjYsNzAuNiwyNS44LDcwLjMsMjUuNCw3MC4xeiBNMTQsODBjLTQuMywwLTcuNC0yLjQtNy45LTZoMTUuOEMyMS40LDc3LjYsMTguMyw4MCwxNCw4MHoiLz4NCgkJPC9nPg0KCTwvZz4NCgk8ZyBpZD0iVEJDLW9uIj4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNzYsNTBoMjVjMC42LDAsMS0wLjQsMS0xVjM1YzAtMC42LTAuNC0xLTEtMUg3N3Y1LjZjMCwwLjMsMC4xLDAuNSwwLjMsMC43bDEuNCwxLjQgICAgIGMwLjIsMC4yLDAuMywwLjQsMC4zLDAuN1Y0NmMwLDAuNi0wLjQsMS0xLDFoLTAuM2MtMC40LDAtMC44LDAuMy0wLjksMC43TDc2LDUweiIvPg0KCQkJPGc+DQoJCQkJPHBhdGggY2xhc3M9InN0NCIgZD0iTTgyLjYsMzkuNGgtMS45di0xaDQuOXYxaC0xLjlWNDVoLTEuMkw4Mi42LDM5LjRMODIuNiwzOS40eiIvPg0KCQkJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik04Ni43LDM4LjVoMi4xYzEuMywwLDIuMywwLjQsMi4zLDEuNmMwLDAuNi0wLjMsMS4yLTEuMSwxLjRsMCwwYzAuOSwwLjIsMS41LDAuNywxLjUsMS41ICAgICAgYzAsMS4zLTEuMSwxLjktMi41LDEuOWgtMi4zVjM4LjV6IE04OC43LDQxLjJjMC45LDAsMS4zLTAuMywxLjMtMWMwLTAuNi0wLjQtMC44LTEuMy0wLjhoLTAuOHYxLjhIODguN3ogTTg4LjgsNDQuMSAgICAgIGMxLDAsMS41LTAuNCwxLjUtMS4xYzAtMC43LTAuNS0xLTEuNS0xaC0xdjIuMUg4OC44eiIvPg0KCQkJCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik05NS4zLDM4LjNjMC44LDAsMS40LDAuNCwxLjksMC44bC0wLjYsMC43Yy0wLjMtMC4zLTAuNy0wLjUtMS4yLTAuNWMtMS4xLDAtMS44LDAuOS0xLjgsMi40ICAgICAgczAuNywyLjQsMS44LDIuNGMwLjYsMCwxLTAuMiwxLjQtMC42bDAuNiwwLjdjLTAuNSwwLjYtMS4yLDAuOS0yLDAuOWMtMS43LDAtMy0xLjItMy0zLjRDOTIuMywzOS42LDkzLjYsMzguMyw5NS4zLDM4LjN6Ii8+DQoJCQk8L2c+DQoJCTwvZz4NCgkJPGc+DQoJCQk8Zz4NCgkJCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNzEsMzRjLTAuMSwwLTAuMiwwLTAuNC0wLjFMNjYsMzIuMUw2MS40LDM0Yy0wLjUsMC4yLTEuMSwwLTEuMy0wLjZjLTAuMi0wLjUsMC0xLjEsMC42LTEuM2w1LTIgICAgICBjMC4yLTAuMSwwLjUtMC4xLDAuNywwbDUsMmMwLjUsMC4yLDAuOCwwLjgsMC42LDEuM0M3MS44LDMzLjgsNzEuNCwzNCw3MSwzNHoiLz4NCgkJCTwvZz4NCgkJCTxnPg0KCQkJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik03MSwzOGMtMC4xLDAtMC4yLDAtMC40LTAuMUw2NiwzNi4xTDYxLjQsMzhjLTAuNSwwLjItMS4xLDAtMS4zLTAuNmMtMC4yLTAuNSwwLTEuMSwwLjYtMS4zbDUtMiAgICAgIGMwLjItMC4xLDAuNS0wLjEsMC43LDBsNSwyYzAuNSwwLjIsMC44LDAuOCwwLjYsMS4zQzcxLjgsMzcuOCw3MS40LDM4LDcxLDM4eiIvPg0KCQkJPC9nPg0KCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTc3LjQsNDIuMUw3Niw0MS40VjM1YzAtMC4zLTAuMS0wLjUtMC4zLTAuN2wtMS0xYy0wLjQtMC40LTEtMC40LTEuNCwwcy0wLjQsMSwwLDEuNGwwLjcsMC43VjQyICAgICBjMCwwLjQsMC4yLDAuNywwLjYsMC45bDEuNCwwLjdWNDRINTZ2LTAuNGwxLjQtMC43YzAuMy0wLjIsMC42LTAuNSwwLjYtMC45di02LjZsMC43LTAuN2MwLjQtMC40LDAuNC0xLDAtMS40cy0xLTAuNC0xLjQsMGwtMSwxICAgICBDNTYuMSwzNC41LDU2LDM0LjcsNTYsMzV2Ni40bC0xLjQsMC43QzU0LjIsNDIuMyw1NCw0Mi42LDU0LDQzdjJjMCwwLjYsMC40LDEsMSwxaDEuMWMwLjUsNC43LDQuNSw4LDkuOSw4czkuNC0zLjMsOS45LThINzcgICAgIGMwLjYsMCwxLTAuNCwxLTF2LTJDNzgsNDIuNiw3Ny44LDQyLjMsNzcuNCw0Mi4xeiBNNjYsNTJjLTQuMywwLTcuNC0yLjQtNy45LTZoMTUuOEM3My40LDQ5LjYsNzAuMyw1Miw2Niw1MnoiLz4NCgkJPC9nPg0KCTwvZz4NCgk8ZyBpZD0iVEJDIj4NCgkJPGc+DQoJCQk8Zz4NCgkJCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMzAuNiwzOS40aC0xLjl2LTFoNC45djFoLTEuOVY0NWgtMS4yTDMwLjYsMzkuNEwzMC42LDM5LjR6Ii8+DQoJCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTM0LjcsMzguNWgyLjFjMS4zLDAsMi4zLDAuNCwyLjMsMS42YzAsMC42LTAuMywxLjItMS4xLDEuNGwwLDBjMC45LDAuMiwxLjUsMC43LDEuNSwxLjUgICAgICBjMCwxLjMtMS4xLDEuOS0yLjUsMS45aC0yLjNWMzguNXogTTM2LjcsNDEuMmMwLjksMCwxLjMtMC4zLDEuMy0xYzAtMC42LTAuNC0wLjgtMS4zLTAuOGgtMC44djEuOEgzNi43eiBNMzYuOCw0NC4xICAgICAgYzEsMCwxLjUtMC40LDEuNS0xLjFjMC0wLjctMC41LTEtMS41LTFoLTF2Mi4xSDM2Ljh6Ii8+DQoJCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQzLjMsMzguM2MwLjgsMCwxLjQsMC40LDEuOSwwLjhsLTAuNiwwLjdjLTAuMy0wLjMtMC43LTAuNS0xLjItMC41Yy0xLjEsMC0xLjgsMC45LTEuOCwyLjQgICAgICBzMC43LDIuNCwxLjgsMi40YzAuNiwwLDEtMC4yLDEuNC0wLjZsMC42LDAuN2MtMC41LDAuNi0xLjIsMC45LTIsMC45Yy0xLjcsMC0zLTEuMi0zLTMuNEM0MC4zLDM5LjYsNDEuNiwzOC4zLDQzLjMsMzguM3oiLz4NCgkJCTwvZz4NCgkJCTxnPg0KCQkJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik00OSw1MEgyN2MtMC42LDAtMS0wLjQtMS0xczAuNC0xLDEtMWgyMVYzNkgyN2MtMC42LDAtMS0wLjQtMS0xczAuNC0xLDEtMWgyMmMwLjYsMCwxLDAuNCwxLDF2MTQgICAgICBDNTAsNDkuNiw0OS42LDUwLDQ5LDUweiIvPg0KCQkJPC9nPg0KCQk8L2c+DQoJCTxnPg0KCQkJPGc+DQoJCQkJPHBhdGggY2xhc3M9InN0MiIgZD0iTTE5LDM0Yy0wLjEsMC0wLjIsMC0wLjQtMC4xTDE0LDMyLjFMOS40LDM0Yy0wLjUsMC4yLTEuMSwwLTEuMy0wLjZjLTAuMi0wLjUsMC0xLjEsMC42LTEuM2w1LTIgICAgICBjMC4yLTAuMSwwLjUtMC4xLDAuNywwbDUsMmMwLjUsMC4yLDAuOCwwLjgsMC42LDEuM0MxOS44LDMzLjgsMTkuNCwzNCwxOSwzNHoiLz4NCgkJCTwvZz4NCgkJCTxnPg0KCQkJCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xOSwzOGMtMC4xLDAtMC4yLDAtMC40LTAuMUwxNCwzNi4xTDkuNCwzOGMtMC41LDAuMi0xLjEsMC0xLjMtMC42Yy0wLjItMC41LDAtMS4xLDAuNi0xLjNsNS0yICAgICAgYzAuMi0wLjEsMC41LTAuMSwwLjcsMGw1LDJjMC41LDAuMiwwLjgsMC44LDAuNiwxLjNDMTkuOCwzNy44LDE5LjQsMzgsMTksMzh6Ii8+DQoJCQk8L2c+DQoJCQk8cGF0aCBjbGFzcz0ic3QyIiBkPSJNMjUuNCw0Mi4xTDI0LDQxLjRWMzVjMC0wLjMtMC4xLTAuNS0wLjMtMC43bC0xLTFjLTAuNC0wLjQtMS0wLjQtMS40LDBzLTAuNCwxLDAsMS40bDAuNywwLjdWNDIgICAgIGMwLDAuNCwwLjIsMC43LDAuNiwwLjlsMS40LDAuN1Y0NEg0di0wLjRsMS40LTAuN0M1LjgsNDIuNyw2LDQyLjQsNiw0MnYtNi42bDAuNy0wLjdjMC40LTAuNCwwLjQtMSwwLTEuNHMtMS0wLjQtMS40LDBsLTEsMSAgICAgQzQuMSwzNC41LDQsMzQuNyw0LDM1djYuNGwtMS40LDAuN0MyLjIsNDIuMywyLDQyLjYsMiw0M3YyYzAsMC42LDAuNCwxLDEsMWgxLjFjMC41LDQuNyw0LjUsOCw5LjksOHM5LjQtMy4zLDkuOS04SDI1ICAgICBjMC42LDAsMS0wLjQsMS0xdi0yQzI2LDQyLjYsMjUuOCw0Mi4zLDI1LjQsNDIuMXogTTE0LDUyYy00LjMsMC03LjQtMi40LTcuOS02aDE1LjhDMjEuNCw0OS42LDE4LjMsNTIsMTQsNTJ6Ii8+DQoJCTwvZz4NCgk8L2c+DQoJPGcgaWQ9IkJDLW9uIj4NCgkJPGc+DQoJCQk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNNzYsMjJoMjVjMC42LDAsMS0wLjQsMS0xVjdjMC0wLjYtMC40LTEtMS0xSDc3djUuNmMwLDAuMywwLjEsMC41LDAuMywwLjdsMS40LDEuNGMwLjIsMC4yLDAuMywwLjQsMC4zLDAuNyAgICAgVjE4YzAsMC42LTAuNCwxLTEsMWgtMC4zYy0wLjQsMC0wLjgsMC4zLTAuOSwwLjdMNzYsMjJ6Ii8+DQoJCQk8Zz4NCgkJCQk8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNODQsMTAuNWgyLjFjMS4zLDAsMi4zLDAuNCwyLjMsMS42YzAsMC42LTAuMywxLjItMS4xLDEuNGwwLDBjMC45LDAuMiwxLjUsMC43LDEuNSwxLjUgICAgICBjMCwxLjMtMS4xLDEuOS0yLjUsMS45SDg0VjEwLjV6IE04NiwxMy4yYzAuOSwwLDEuMy0wLjMsMS4zLTFjMC0wLjYtMC40LTAuOC0xLjMtMC44aC0wLjh2MS44SDg2eiBNODYuMSwxNi4xICAgICAgYzEsMCwxLjUtMC40LDEuNS0xLjFjMC0wLjctMC41LTEtMS41LTFoLTF2Mi4xSDg2LjF6Ii8+DQoJCQkJPHBhdGggY2xhc3M9InN0NCIgZD0iTTkyLjYsMTAuM2MwLjgsMCwxLjQsMC40LDEuOSwwLjhsLTAuNiwwLjdjLTAuMy0wLjMtMC43LTAuNS0xLjItMC41Yy0xLjEsMC0xLjgsMC45LTEuOCwyLjQgICAgICBzMC43LDIuNCwxLjgsMi40YzAuNiwwLDEtMC4yLDEuNC0wLjZsMC42LDAuN2MtMC41LDAuNi0xLjIsMC45LTIsMC45Yy0xLjcsMC0zLTEuMi0zLTMuNEM4OS42LDExLjYsOTAuOSwxMC4zLDkyLjYsMTAuM3oiLz4NCgkJCTwvZz4NCgkJPC9nPg0KCQk8Zz4NCgkJCTxnPg0KCQkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik03MSw2Yy0wLjEsMC0wLjIsMC0wLjQtMC4xTDY2LDQuMUw2MS40LDZjLTAuNSwwLjItMS4xLDAtMS4zLTAuNnMwLTEuMSwwLjYtMS4zbDUtMmMwLjItMC4xLDAuNS0wLjEsMC43LDAgICAgICBsNSwyYzAuNSwwLjIsMC44LDAuOCwwLjYsMS4zQzcxLjgsNS44LDcxLjQsNiw3MSw2eiIvPg0KCQkJPC9nPg0KCQkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTc3LjQsMTQuMUw3NiwxMy40VjdjMC0wLjMtMC4xLTAuNS0wLjMtMC43bC0xLTFjLTAuNC0wLjQtMS0wLjQtMS40LDBzLTAuNCwxLDAsMS40TDc0LDcuNFYxNCAgICAgYzAsMC40LDAuMiwwLjcsMC42LDAuOWwxLjQsMC43VjE2SDU2di0wLjRsMS40LTAuN2MwLjMtMC4yLDAuNi0wLjUsMC42LTAuOVY3LjRsMC43LTAuN2MwLjQtMC40LDAuNC0xLDAtMS40cy0xLTAuNC0xLjQsMGwtMSwxICAgICBDNTYuMSw2LjUsNTYsNi43LDU2LDd2Ni40bC0xLjQsMC43QzU0LjIsMTQuMyw1NCwxNC42LDU0LDE1djJjMCwwLjYsMC40LDEsMSwxaDEuMWMwLjUsNC43LDQuNSw4LDkuOSw4czkuNC0zLjMsOS45LThINzcgICAgIGMwLjYsMCwxLTAuNCwxLTF2LTJDNzgsMTQuNiw3Ny44LDE0LjMsNzcuNCwxNC4xeiBNNjYsMjRjLTQuMywwLTcuNC0yLjQtNy45LTZoMTUuOEM3My40LDIxLjYsNzAuMywyNCw2NiwyNHoiLz4NCgkJPC9nPg0KCTwvZz4NCgk8ZyBpZD0iQkNfMV8iPg0KCQk8Zz4NCgkJCTxnPg0KCQkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0zMiwxMC41aDIuMWMxLjMsMCwyLjMsMC40LDIuMywxLjZjMCwwLjYtMC4zLDEuMi0xLjEsMS40bDAsMGMwLjksMC4yLDEuNSwwLjcsMS41LDEuNSAgICAgIGMwLDEuMy0xLjEsMS45LTIuNSwxLjlIMzJWMTAuNXogTTM0LDEzLjJjMC45LDAsMS4zLTAuMywxLjMtMWMwLTAuNi0wLjQtMC44LTEuMy0wLjhoLTAuOHYxLjhIMzR6IE0zNC4xLDE2LjEgICAgICBjMSwwLDEuNS0wLjQsMS41LTEuMWMwLTAuNy0wLjUtMS0xLjUtMWgtMXYyLjFIMzQuMXoiLz4NCgkJCQk8cGF0aCBjbGFzcz0ic3QzIiBkPSJNNDAuNiwxMC4zYzAuOCwwLDEuNCwwLjQsMS45LDAuOGwtMC42LDAuN2MtMC4zLTAuMy0wLjctMC41LTEuMi0wLjVjLTEuMSwwLTEuOCwwLjktMS44LDIuNCAgICAgIHMwLjcsMi40LDEuOCwyLjRjMC42LDAsMS0wLjIsMS40LTAuNmwwLjYsMC43Yy0wLjUsMC42LTEuMiwwLjktMiwwLjljLTEuNywwLTMtMS4yLTMtMy40QzM3LjYsMTEuNiwzOC45LDEwLjMsNDAuNiwxMC4zeiIvPg0KCQkJPC9nPg0KCQkJPGc+DQoJCQkJPHBhdGggY2xhc3M9InN0MyIgZD0iTTQ5LDIySDI3Yy0wLjYsMC0xLTAuNC0xLTFzMC40LTEsMS0xaDIxVjhIMjdjLTAuNiwwLTEtMC40LTEtMXMwLjQtMSwxLTFoMjJjMC42LDAsMSwwLjQsMSwxdjE0ICAgICAgQzUwLDIxLjYsNDkuNiwyMiw0OSwyMnoiLz4NCgkJCTwvZz4NCgkJPC9nPg0KCQk8Zz4NCgkJCTxnPg0KCQkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xOSw2Yy0wLjEsMC0wLjIsMC0wLjQtMC4xTDE0LDQuMUw5LjQsNS45Yy0wLjUsMC4yLTEuMSwwLTEuMy0wLjZzMC0xLjEsMC42LTEuM2w1LTIgICAgICBjMC4yLTAuMSwwLjUtMC4xLDAuNywwbDUsMmMwLjUsMC4yLDAuOCwwLjgsMC42LDEuM0MxOS44LDUuOCwxOS40LDYsMTksNnoiLz4NCgkJCTwvZz4NCgkJCTxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yNS40LDE0LjFMMjQsMTMuNFY3YzAtMC4zLTAuMS0wLjUtMC4zLTAuN2wtMS0xYy0wLjQtMC40LTEtMC40LTEuNCwwcy0wLjQsMSwwLDEuNEwyMiw3LjRWMTQgICAgIGMwLDAuNCwwLjIsMC43LDAuNiwwLjlsMS40LDAuN1YxNkg0di0wLjRsMS40LTAuN0M1LjgsMTQuNyw2LDE0LjQsNiwxNFY3LjRsMC43LTAuN2MwLjQtMC40LDAuNC0xLDAtMS40cy0xLTAuNC0xLjQsMGwtMSwxICAgICBDNC4xLDYuNSw0LDYuNyw0LDd2Ni40bC0xLjQsMC43QzIuMiwxNC4zLDIsMTQuNiwyLDE1djJjMCwwLjYsMC40LDEsMSwxaDEuMWMwLjUsNC43LDQuNSw4LDkuOSw4czkuNC0zLjMsOS45LThIMjUgICAgIGMwLjYsMCwxLTAuNCwxLTF2LTJDMjYsMTQuNiwyNS44LDE0LjMsMjUuNCwxNC4xeiBNMTQsMjRjLTQuMywwLTcuNC0yLjQtNy45LTZoMTUuOEMyMS40LDIxLjYsMTguMywyNCwxNCwyNHoiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjxnIGlkPSJicmFuZCI+DQo8L2c+DQo8ZyBpZD0iZ2VuZXJpYyI+DQo8L2c+DQo8ZyBpZD0ibmVnYXRpdmUiPg0KPC9nPg0KPGcgaWQ9ImNyZWF0aW9uIj4NCjwvZz4NCjxnIGlkPSJnYW1lcyI+DQo8L2c+DQo8ZyBpZD0iU29jaWFsX2FuZF9JbnRlcmFjdGlvbiI+DQo8L2c+DQo8L3N2Zz4=")} `)
    }
    if (changeAccent) {
         injectStyle(`*[class^="btn-secondary-"],.dialog-container .dialog-message-container .dialog-message { background-color: ${accentColour};border-color:${accentColour};}
.rbx-header,#chat-header,.dialog-container .dialog-header,.chat-windows-header,.details-members-container .add-friends-option .add-friends-cirle-container:hover,.notification-blue {background-color: ${accentColour};}
.details-members-container .add-friends-option .add-friends-cirle-container{border: 1px solid ${accentColour}}
.participant-list-action a, .participant-list-action a:hover, .participant-list-action a:visited,.text-name, .text-name:link, .text-name:hover, .text-name:visited, .text-name:active,.text-link, .vlist .list-item .list-body .list-content a, .text-link:link, .vlist .list-item .list-body .list-content a:link, .text-link:hover, .vlist .list-item .list-body .list-content a:hover, .text-link:visited, .vlist .list-item .list-body .list-content a:visited, .text-link:active, .vlist .list-item .list-body .list-content a:active,#nav-message:hover, #nav-friends:hover, #nav-trade:hover, #nav-group:hover, #nav-blog:hover, #nav-shop:hover,.text-name.small, .text-name.small:link, .text-name.small:visited, .text-name.small:active, .text-name.xsmall, .text-name.xsmall:link, .text-name.xsmall:visited, .text-name.xsmall:active, .text-name.xxsmall, .text-name.xxsmall:link, .text-name.xxsmall:visited, .text-name.xxsmall:active {color: ${accentColour}}
.dropdown-menu li:hover { box-shadow: 4px 0 0 0 ${accentColour} inset;}
.rbx-tabs-horizontal .rbx-tab.active .rbx-tab-heading,.rbx-tabs-horizontal .rbx-tab-heading:hover, .rbx-tabs-horizontal .rbx-tab-heading:focus, .rbx-tabs-horizontal .rbx-tab-heading:active { box-shadow: 0 -4px 0 0 ${accentColour} inset}
.dialog-container .dialog-message-container.message-cluster-master .dialog-triangle::before, .dialog-container .dialog-message-container.message-cluster-master .dialog-triangle::after { border-color: transparent transparent transparent ${accentColour};`)
    }
    if (declutterHamburger) {
        var clutteredHamburger = [
            ".rbx-upgrade-now", //No.
            "#nav-shop", // Who buys Roblox merch :lul:
            "#nav-blog", // just use the news feed on the home
            "#nav-home", //just click the roblox logo
            "#navigation > ul:nth-child(1)",
            "footer"
        ]
        clutteredHamburger.forEach(function(i) {
            try {
               document.querySelector(i).remove()
            } catch(e) {}
        })
        injectStyle(`#mCSB_1_container > ul:nth-child(1) > li > a > span:nth-child(2) {display:none;}
                     .rbx-left-col { width: 50px !important; margin-right:125px;}
                     #nav-message > span:nth-child(3),#nav-friends > span:nth-child(3) { left: 5px; width: 15px; top: 5px;transform: scale(0.75); }
                     .home-container { position: absolute; left: 50%; transform: translate(-50%,0%);}`)
    }

})();