// ==UserScript==
// @name TJUPT - Direct Links
// @namespace https://github.com/whtsky/userscripts/
// @version 20200213
// @description 将 TJUPT 中的外链转换为直接链接
// @match https://tjupt.org/*
// @grant none
// @downloadURL https://userscripts.whtsky.me/tjupt-direct_links.user.js
// @updateURL https://userscripts.whtsky.me/tjupt-direct_links.user.js
// @supportURL https://github.com/whtsky/userscripts/issues
// ==/UserScript==

function removeTo(s, to) {
  const index = s.search(to)
  if (index !== -1) {
    return s.substr(index + to.length)
  }
  return s
}

document.querySelectorAll('a').forEach(anchor => {
  let link = anchor.href
  if (link.startsWith('https://tjupt.org/adredir.php')) {
    link = removeTo(link, 'url=')
  } else if (link.startsWith('https://tjupt.org/jump_external.php')) {
    link = removeTo(link, 'ext_url=')
  } else {
    return
  }
  anchor.href = decodeURIComponent(link)
})
