// ==UserScript==
// @name        Disable coursera video play when clicking transscript
// @description Avoid paused coursera video being played when clicking transscript.
// @version 20220506
// @match       https://www.coursera.org/learn/*
// @grant       none
// @version     1.0
// @author      -
// @run-at document-idle
// @downloadURL https://userscripts.whtsky.me/coursera-transscript-videoautoplay-disable.user.js
// @updateURL https://userscripts.whtsky.me/coursera-transscript-videoautoplay-disable.user.js
// @supportURL https://github.com/whtsky/userscripts/issues
// ==/UserScript==

const noop = () => {}

const preventVideoPlay = () => {
  const video = document.querySelector('video')
  const oldVideoPlay = video.play
  video.play = noop
  video.oldPlay = oldVideoPlay
}

const resumeVideoPlay = () => {
  const video = document.querySelector('video')
  video.play = video.oldPlay ?? video.play
}

const check = (changes, observer) => {
  const transscriptDiv = document.querySelector('.rc-TranscriptHighlighter')
  if (transscriptDiv) {
    transscriptDiv.addEventListener('mouseenter', preventVideoPlay)
    transscriptDiv.addEventListener('mouseleave', resumeVideoPlay)
  }
}

new MutationObserver(check).observe(document, { childList: true, subtree: true })
