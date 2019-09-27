// ==UserScript==
// @name         天使动漫自动签到打工
// @version      1.2
// @description  天使动漫全自动打工签到脚本 — 完全自动无需任何操作
// @match        *://tsdm.live/*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-end
// @downloadURL https://userscripts.tt.codes/tsdm.user.js
// @updateURL https://userscripts.tt.codes/tsdm.user.js
// @supportURL https://github.com/whtsky/userscripts/issues
// ==/UserScript==

// From https://github.com/jc3213/user.js/blob/08bdca7cfa338b3550a181d7278e5584fa140075/TSDM.user.js

const workUrl = 'https://tsdm.live/plugin.php?id=np_cliworkdz:work'

jQuery(document).ready($ => {
  var signed = GM_getValue('signed', '')
  var worked = GM_getValue('worked', 0)
  const today = new Date().toLocaleDateString()
  var now = Date.now()

  if (signed !== today) {
    showWindow('dsu_paulsign', 'plugin.php?id=dsu_paulsign:sign&616cdca8')
    setTimeout(() => {
      if ($('h1[class="mt"]').text() === '您今天已经签到过了或者签到时间还未开始') {
        hideWindow('dsu_paulsign')
      } else {
        Icon_selected('kx')
        $('#todaysay').val('每日签到')
        showWindow('qwindow', 'qiandao', 'post', '0')
      }
      GM_setValue('signed', today)
    }, 2000)
  }
  if (location.href === workUrl) {
    let next = 21600000
    if (
      $('div[id="messagetext"] > p')
        .text()
        .includes('必须与上一次间隔6小时0分钟0秒才可再次进行。')
    ) {
      const timer = $('div[id="messagetext"] > p')
        .text()
        .split(/[^0123456789]+/g)
      next = parseInt(timer[4]) * 3600000 + parseInt(timer[5]) * 60000 + parseInt(timer[6]) * 1000
      setTimeout(() => {
        location.href = 'index.php'
      }, 3000)
    } else {
      document.querySelectorAll('div.npadv > a').forEach((el, index) => {
        setTimeout(() => el.click(), index * 500)
      })
      setTimeout(() => document.querySelector('#workstart').click(), 500 * 8)
    }
    GM_setValue('worked', now + next)
  } else if (now >= worked) {
    open(workUrl, '_self')
  }
})
