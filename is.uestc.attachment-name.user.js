// ==UserScript==
// @name 电子科大信软学院 - 修正附件下载文件名
// @description 让电子科大信软学院网站里的附件在下载时显示正确的文件名
// @version 4
// @match http://www.is.uestc.edu.cn/news.do
// @match http://www.is.uestc.edu.cn/notice.do
// @grant none
// @downloadURL https://userscripts.whtsky.me/is.uestc.attachment-name.user.js
// @updateURL https://userscripts.whtsky.me/is.uestc.attachment-name.user.js
// @supportURL https://github.com/whtsky/userscripts/issues
// ==/UserScript==

const attachmentRe = /附件\d+[-：](.+)$/

document.querySelectorAll('.text a').forEach(anchor => {
  const match = anchor.innerText.match(attachmentRe)
  if (match) {
    anchor.download = match.pop().trim()
  }
})
