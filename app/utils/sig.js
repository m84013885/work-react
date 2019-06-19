import md5 from 'md5'
/*
  对象排序拼接成字符串
*/
function sigSortObj (obj) {
  if (!obj) { return '' }
  const arr = []
  let sigString = ''
  let str = ''
  for (const key in obj) { arr.push(key) }
  arr.sort()
  for (let i = arr.length - 1; i >= 0; i--) {
    const key = arr[i]
    let tail = '&'
    if (i === 0) { tail = '' }
    if (key === 'return_url') {
      sigString = sigString + (key + '=' + obj[key]) + tail
      str = str + (key + '=' + encodeURIComponent(obj[key])) + tail
    }
    else {
      sigString = sigString + (key + '=' + obj[key]) + tail
      str = str + (key + '=' + obj[key]) + tail
    }
  }
  return { sigString, string: str }
}

/**
 * 接口生成签名 POST
 * @param {*必要参数} obj1
 * @param {*post参数} obj2
 */
function sigFuncPost (obj1, obj2) {
  if (!obj1) { return }
  const salt = 'cc4bf957c3244a6ebb96cd63206f5632'
  const str1 = sigSortObj(obj1).sigString
  const str2 = sigSortObj(obj2).sigString
  const sigString = str2 + '&' + str1 + '&salt=' + salt
  const sig = md5(sigString)
  return {
    str: str1,
    sig
  }
}

/*
  websocket签名
  传入1个／2个 json对象，生成签名
*/
function sigFuncWebSocket (obj1, obj2) {
  if (!obj1) {
    return
  }
  const salt = 'cc4bf957c3244a6ebb96cd63206f5632'
  const str1 = sigSortObj(obj1).sigString
  const str2 = sigSortObj(obj2).sigString
  const sigString = str1 + str2 + '&salt=' + salt
  const sig = md5(sigString)
  return {
    str: str1 + str2,
    sig
  }
}

/*
  传入1个／2个 json对象，生成签名
*/

function sigFuncGet (obj1) {
  if (!obj1) { return }
  const salt = 'cc4bf957c3244a6ebb96cd63206f5632' // 热猫
  // var salt = 'af8fdcf25f73476296aeb4f3d6c318f3'  //啵啵
  let { sigString, string } = sigSortObj(obj1)
  // console.log(sigString, string)
  sigString = sigString + '&salt=' + salt
  const sig = md5(sigString)
  // console.log(sigString)
  return {
    str: string,
    sig
  }
}

export { sigFuncGet, sigFuncPost, sigFuncWebSocket }
