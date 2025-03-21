// ==UserScript==
// @name        Youtube Playback Speed Hotkeys
// @namespace   https://fap.re
// @match       https://www.youtube.com/watch*
// @grant       GM_addStyle
// @version     20250521.1
// @author      fap
// @description Adds hotkeys for changing the playback speed of the video player
// ==/UserScript==

(() => {
  GM_addStyle('.playback-flash { padding: 1rem; position: absolute; bottom: 1rem; left: 1rem; border: 2px white solid; color: white; background-color: black; z-index: 999999; min-width: 18ch; }');

  function createFlashMessageDiv() {
    const div = document.createElement("div");
    div.classList.add("playback-flash");
    div.style = "display: none;"
    return document.body.appendChild(div);
  }

  const flash = createFlashMessageDiv();
  const videoElement = document.querySelector('video');
  let timeout;

  document.addEventListener('keydown', function(event) {
    if (event.key === '+' || event.ctrlKey && event.key === 'ArrowUp') {
      videoElement.playbackRate += 0.25;
    } else if (event.key === '-' || event.ctrlKey && event.key === 'ArrowDown') {
      videoElement.playbackRate -= 0.25;
    } else if (event.key === '.') {
      videoElement.playbackRate = 1.0;
    } else {
      return;
    }
    event.preventDefault();
    clearTimeout(timeout);
    flash.textContent = `Playback speed: ${videoElement.playbackRate}`;
    flash.style = "";
    timeout = setTimeout(() => { flash.style = "display: none;" }, 2000);
    console.log(`Video Playback Rate: ${videoElement.playbackRate}`);
  } );
})();
