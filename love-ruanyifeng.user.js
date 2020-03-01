// ==UserScript==
// @name    Anti-AntiAdblock on ruanyifeng.com
// @description Make RuanYiFeng Happy
// @version 1
// @grant   none
// @inject-into auto
// @downloadURL https://userscripts.whtsky.me/love-ruanyifeng.user.js
// @updateURL https://userscripts.whtsky.me/love-ruanyifeng.user.js
// @supportURL https://github.com/whtsky/userscripts/issues
// @match   *://*.ruanyifeng.com/*
// ==/UserScript==

const el = document.getElementById('main-content')

const ryf = el.innerHTML

function ruanyifeng() {
  document.getElementsByClassName('asset-meta')[0].nextElementSibling.style = 'display:none'
  el.innerHTML = ryf
  el.style.display = 'block'
  const e = setTimeout(ruanyifeng, 1001)
  for (let i = 0; i <= e; i++) {
    clearTimeout(i)
  }
}

const e = setTimeout(ruanyifeng, 1001)
for (let i = 0; i < e; i++) {
  clearTimeout(i)
}
