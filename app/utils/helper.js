import md5 from 'md5'
const CREDS = 'include'
const SALT = 'cc4bf957c3244a6ebb96cd63206f5632' // 热猫
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) { return response }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}
// 必要参数
const Mustparameter = () => {
  const ua = navigator.userAgent.toLowerCase()
  let sys = 'web'
  if (ua.indexOf('android') > -1) { sys = 'android' }
  else { sys = 'ios' }
  return {
    sys: sys,
    web: 2,
    ts: new Date().getTime(),
    app: window.serverData.app || 2
  }
}
/*
  对象排序拼接成字符串
*/
const sigSortObj = (obj) => {
  if (!obj) { return '' }
  const arr = []
  let sigString = ''
  // let str = ''
  for (const key in obj) { arr.push(key) }
  arr.sort()
  for (let i = arr.length - 1; i >= 0; i--) {
    const key = arr[i]
    const tail = i === 0 ? '' : '&'
    sigString = sigString + (key + '=' + encodeURIComponent(obj[key])) + tail
  }
  return sigString
}
/**
 * 请求签名
 * @param {*} urlPara
 * * @param {*} bodyPara
 */
function sigFunc (query, body) {
  query = Object.assign(Mustparameter(), query)
  const sigQueryString = sigSortObj(query)
  if (body) {
    const sigBodyString = sigSortObj(body)
    const sig = md5(`${sigBodyString}&${sigQueryString}&salt=${SALT}`)
    return `?sig=${sig}&${sigQueryString}`
  }
  else {
    const sig = md5(`${sigQueryString}&salt=${SALT}`)
    return `sig=${sig}&${sigQueryString}`
  }
}
/**
 *
 * @param {*} obj
 * obj = {
 * url
 * method
 * credentials
 * query
 * body
 * }
 */
const asyncFetch = async function (obj) {
  const urlTail = sigFunc(obj.query, obj.body)
  const url = `${obj.url}?${urlTail}`
  const method = obj.method || 'GET'
  const credentials = obj.credentials || CREDS
  const data = obj.body || null
  let confFetch = { method, credentials }
  if (method === 'POST') { confFetch = { method, credentials, body: JSON.stringify(data) } }
  return new Promise(function (resolve, reject) {
    fetch(url, confFetch)
      .then(checkStatus)
      .then(res => res.json())
      .then(res => { resolve(res) })
      .catch(err => { reject(err) })
  })
}

export { asyncFetch, sigFunc }
