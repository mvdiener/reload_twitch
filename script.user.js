// ==UserScript==
// @name         Reload Twitch
// @version      0.41
// @description  Reloads a Twitch page to check if stream is live, time settings are UTC and set for the Boston 2018 CS:GO Major start times.
// @author       LaminatedSteel
// @include      https://www.twitch.tv/*
// @run-at       document-idle
// @noframes
// @grant        window.reload
// @namespace https://greasyfork.org/users/141414
// ==/UserScript==

(function() {
    'use strict';

    setInterval(function() {
        reloadTwitch(15, 19);
        reloadTwitch(15, 20);
        reloadTwitch(15, 21);
        reloadTwitch(15, 22);
        reloadTwitch(15, 26);
        reloadTwitch(15, 27);
        reloadTwitch(19, 28);
    }, 300000);
})();

function reloadTwitch(utcHours, utcDayOfMonth) {
    console.log('testing webhook from github to greasyfork');
    //If for some reason the player itself hasn't loaded, refresh the page
    if (!document.getElementsByClassName('video-player__container')[0]) {
        window.location.reload(true);
    }

    //If there is an error on the player, refresh the page
    if (document.getElementsByClassName('video-player__container')[0].getAttribute('data-screen') == "error") {
        window.location.reload(true);
    }

    var now = new Date();
    var isAfterStartTimeOnCorrectDay = (now.getUTCDate() == utcDayOfMonth && now.getUTCHours() >= utcHours);
    
    if (isAfterStartTimeOnCorrectDay && ((document.getElementsByClassName('video-player__container')[0].getAttribute('data-ended') == "true") || (document.getElementsByClassName('player-streamstatus__label')[0].innerHTML == "Offline"))) {
        window.location.reload(true);
    }
}
