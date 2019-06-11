// import queryString from 'query-string'
/*
  获取相关参数
  sys - 系统版本号
  net - 网络情况（wifi/no_wifi 等）
  chn - 渠道标志（web的渠道标志全部以web开头，如web_remix）
  web - 标志web请求（取值1）
  ts - 时间戳（13位毫秒数）
*/
function Mustparameter () {
  // 非微信里面不需要
  const ua = navigator.userAgent.toLowerCase()
  const net = 'wifi'
  let sys = 'web'
  const chn = 'remix_activity'
  if (ua.indexOf('android')) {
    sys = 'android'
  }
  else {
    sys = 'ios'
  }
  return {
    sys: sys,
    net: net,
    chn: chn,
    web: 1,
    ts: new Date().getTime(),
    app: window.serverData.app || 2,
    token: window.serverData.token || ''
  }
}
export default Mustparameter
