function getRootPath () {
  const curWwwPath = window.document.location.href
  const pathName = window.document.location.pathname
  const pos = curWwwPath.indexOf(pathName)
  const localhostPaht = curWwwPath.substring(0, pos)
  const projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1)
  return (localhostPaht + projectName)
}

const shareFunc = function () {
  const { serverData } = window
  window.shareImg = serverData.share.pic
  window.shareTitle = serverData.share.title
  window.shareContent = serverData.share.content
  window.shareUrl = getRootPath() + '/activity/' + serverData.share.url
}
export default shareFunc
