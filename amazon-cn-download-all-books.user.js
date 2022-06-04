// ==UserScript==
// @name        亚马逊中国Kindle下载所有内容
// @description 在亚马逊中国的“管理我的内容和设备”页面增加“下载本页所有内容”按钮，便于备份你买过的 Kindle 书籍。
// @version 20220603.1
// @match       https://www.amazon.cn/gp/digital/fiona/manage*
// @match       https://www.amazon.cn/mn/dcw/myx.html*
// @grant       none
// @run-at document-idle
// @downloadURL https://userscripts.whtsky.me/amazon-cn-download-all-books.user.js
// @updateURL https://userscripts.whtsky.me/amazon-cn-download-all-books.user.js
// @supportURL https://github.com/whtsky/userscripts/issues
// ==/UserScript==

const sleep = (/** @type {number} */ ms) => new Promise((r) => setTimeout(r, ms))

/**
 *
 * @returns {Promise<any>}
 */
async function waitGetElement(/** @type {ParentNode} */ root, /** @type {string} */ selector) {
  while (true) {
    const result = root.querySelector(selector)
    if (result) {
      return result
    }
    await sleep(2000)
  }
}

async function waitElementDisappear(/** @type {ParentNode} */ root, /** @type {string} */ selector) {
  while (true) {
    const result = root.querySelector(selector)
    if (result) {
      await sleep(2000)
    }
    return
  }
}

/**
 *
 * @param {HTMLDivElement} div
 */
async function downloadBook(div) {
  const /** @type {HTMLButtonElement} */ actionButton = await waitGetElement(div, '[aria-label="actions"]')
  actionButton.click()
  console.debug('click action')

  const /** @type {HTMLDivElement} */ downloadLink = await waitGetElement(div, 'div#contentAction_download_myx')
  downloadLink.click()
  console.debug('click downlaod')

  await waitGetElement(document, '#ui_dialog_myx_popover_section')
  console.debug('get popup')

  const /** @type {HTMLButtonElement} */ confirmDownload = await waitGetElement(
      document,
      '#ui_dialog_myx_popover_footer .myx-button-primary',
    )
  confirmDownload.click()
  console.debug('click confirm')

  await waitElementDisappear(document, '.dialogBackdrop_myx')
}
async function downloadAllBooksOnPage() {
  const /** @type {HTMLDivElement[]} */ books = Array.from(
      document.querySelectorAll('div.contentTableListRow_myx.ng-scope'),
    )
  for (const book of books) {
    await downloadBook(book)
    await sleep(15000)
  }
}

async function addDownloadAllButton() {
  const /** @type {HTMLDivElement} */ buttonsDiv = await waitGetElement(document, '.myx-spacing-top-mini')
  const downloadAllButton = document.createElement('button')
  downloadAllButton.addEventListener('click', downloadAllBooksOnPage)
  downloadAllButton.className = 'inline_myx button_myx myx-button'
  downloadAllButton.style.marginLeft = '5px'
  downloadAllButton.style.paddingLeft = '5px'
  downloadAllButton.style.paddingRight = '5px'
  downloadAllButton.style.background = '-webkit-linear-gradient(top,#f7f8fa,#e7e9ec)'
  downloadAllButton.innerText = '下载本页所有内容'
  buttonsDiv.appendChild(downloadAllButton)
}

addDownloadAllButton()
