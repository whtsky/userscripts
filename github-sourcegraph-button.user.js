// ==UserScript==
// @name    Add Sourcegraph Button to GitHub
// @description Add a 'Sourcrgraph' Button on GitHub repository & file page.
// @version 4
// @grant   none
// @inject-into auto
// @downloadURL https://userscripts.whtsky.me/github-sourcegraph-button.user.js
// @updateURL https://userscripts.whtsky.me/github-sourcegraph-button.user.js
// @supportURL https://github.com/whtsky/userscripts/issues
// @match   https://github.com/*
// ==/UserScript==

function getSourceGraphUrl() {
  var pats = [
    [
      '^/([^/]+)/([^/]+)/tree/([^/]+)$',
      '/github.com/$1/$2@$3',
      '^/github.com/([^/]+)/([^/@]+)@([^/]+)$',
      '/$1/$2/tree/$3',
    ],
    [
      '^/([^/]+)/([^/]+)/tree/([^/]+)/(.+)$',
      '/github.com/$1/$2@$3/-/tree/$4',
      '^/github.com/([^/]+)/([^/@]+)@([^/]+)/-/tree/(.+)$',
      '/$1/$2/tree/$3/$4',
    ],
    ['^/([^/]+)/([^/]+)/blob/([^/]+)/(.+)$', '/github.com/$1/$2@$3/-/blob/$4', '', ''],
    ['^/([^/]+)/([^/]+)$', '/github.com/$1/$2', '^/github.com/([^/]+)/([^/]+)$', '/$1/$2'],
    ['^/([^/]+)$', '/$1', '^/([^/]+)$', '/$1'],
  ]
  var pathname = window.location.pathname
  for (var i = 0; i < pats.length; i++) {
    var pat = pats[i]
    var r, pathname2
    if (window.location.hostname === 'github.com') {
      if (pat[0] === '') {
        continue
      }
      r = new RegExp(pat[0])
      if (pathname.match(r)) {
        pathname2 = pathname.replace(r, pat[1])
        return 'https://sourcegraph.com' + pathname2
      }
    } else {
      if (pat[2] === '') {
        continue
      }
      r = new RegExp(pat[2])
      if (pathname.match(r)) {
        pathname2 = pathname.replace(r, pat[3])
        return 'https://github.com' + pathname2
      }
    }
  }
}

function goToSourcegraph(event) {
  event.preventDefault()
  const sourceGraphUrl = getSourceGraphUrl()
  if (sourceGraphUrl) {
    window.location = sourceGraphUrl
  } else {
    alert('Unable to jump to Sourcegraph (no matching URL pattern).')
  }
}

function createButton() {
  if (document.querySelector('#userscript__sourcegraph')) {
    return
  }
  const targetBtn = document.querySelector('#raw-url') || document.querySelector('.file-navigation a.BtnGroup-item')
  if (targetBtn) {
    const newBtn = targetBtn.cloneNode(false)
    newBtn.setAttribute('id', 'userscript__sourcegraph')
    newBtn.setAttribute('class', 'btn btn-sm BtnGroup-item')
    newBtn.textContent = 'Sourcegraph'
    newBtn.href = ''
    newBtn.addEventListener('click', goToSourcegraph)
    targetBtn.parentNode.insertBefore(newBtn, targetBtn)
    targetBtn.parentNode.addEventListener('mouseenter', () => {
      newBtn.href = getSourceGraphUrl()
    })
  }
}

const observer = new MutationObserver(function() {
  observer.disconnect()
  createButton()
  observer.observe(document.body, { childList: true, subtree: true })
})
observer.observe(document.body, { childList: true, subtree: true })

createButton()
