// ==UserScript==
// @name         巴哈姆特 wiki 链接标准化
// @version      1.0
// @description  把巴哈姆特 wiki 侧边栏的链接 target 变成正确的 URL ，从而可以按住 Ctrl 键点击、在新 Tab 页中打开。
// @match       https://wiki2.gamer.com.tw/wiki.php
// @downloadURL https://userscripts.whtsky.me/gamer-wiki-links.user.js
// @updateURL https://userscripts.whtsky.me/gamer-wiki-links.user.js
// @supportURL https://github.com/whtsky/userscripts/issues
// ==/UserScript==

const ss = document.querySelector('input[name=ss]').value

function getMenuLink(furl) {
  const urlarr = decodeURIComponent(furl).split('#')
  const url = urlarr[0]
  const anchor = urlarr[1] ? '#' + urlarr[1] : ''
  return location.origin + url + `&ss=${ss}&mpath=${window.MenuPath}${anchor}`
}

const re = /javascript:MenuLink\('(.+)'\)/

document.querySelectorAll('a').forEach(anchor => {
  const match = anchor.href.match(re)
  if (match) {
    anchor.href = getMenuLink(match[1])
  }
})
