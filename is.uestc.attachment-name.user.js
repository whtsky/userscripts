// ==UserScript==
// @name 电子科大信软学院 - 修正附件下载文件名
// @version 1
// @match http://www.is.uestc.edu.cn/news.do
// @grant none
// ==/UserScript==

const attachmentRe = /附件\d+-(.+)$/

document.querySelectorAll('.text a').forEach((anchor) => {
  const match = anchor.innerText.match(attachmentRe)
  if (match) {
      anchor.download = match.pop().trim()
  }
})
