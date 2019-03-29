// ==UserScript==
// @name     qiandao.today 隐藏一周内未成功的签到模板
// @version  1
// @match    https://qiandao.today/tpls/public
// @require  https://unpkg.com/dayjs@1.8.11/dayjs.min.js
// @require  https://unpkg.com/dayjs@1.8.11/plugin/customParseFormat.js
// @grant    none
// ==/UserScript==


dayjs.extend(dayjs_plugin_customParseFormat)

const now = dayjs()

function tryParse(lastSuccess) {
  let d = dayjs(lastSuccess, 'YYYY-M-D H-m-s')
  if (d.isValid()) {
    return d
  }
  
  d = dayjs(lastSuccess, 'M-D H-m-s')
  if (d.isValid()) {
    if (d.isAfter(now)) {
      return d.subtract(1, 'year')
    }
    return d
  }
  throw lastSuccess
}

document.querySelectorAll('table tr').forEach(f => {
  const lastSuccessNode = f.querySelector('.last_success')
  if (!lastSuccessNode) {
    if (f.innerHTML.includes('从未')) {
      f.remove()
    }
    return
  }
  const lastSuccess = lastSuccessNode.textContent.trim()
  if (lastSuccess.includes('前')) {
    return
  }
  const t = tryParse(lastSuccess);
  if (now.diff(t, 'week') > 1) {
    f.remove()
    return
  }
})

