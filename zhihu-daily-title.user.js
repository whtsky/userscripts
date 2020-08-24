// ==UserScript==
// @name        知乎日报 - 更新 title
// @match       https://daily.zhihu.com/*
// @version      1.0
// @description  根据知乎日报的标题更新页面 title 标签
// @downloadURL https://userscripts.whtsky.me/zhihu-daily-title.user.js
// @updateURL https://userscripts.whtsky.me/zhihu-daily-title.user.js
// @supportURL https://github.com/whtsky/userscripts/issues
// ==/UserScript==

const questionTitle = document.querySelector('.DailyHeader-title').innerText
const expectedTitle = `${questionTitle} - 知乎日报`

function updateTitle() {
  document.title = expectedTitle
}

new MutationObserver(function () {
  // fight with react-helmet
  if (document.title != expectedTitle) {
    updateTitle()
  }
}).observe(document.querySelector('title'), { subtree: true, characterData: true })

updateTitle()
