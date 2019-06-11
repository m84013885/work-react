/* eslint-disable */
'use strict'
import '../../utills/resize'
import Enter from './enter'

if (module.hot) {
  module.hot.accept()
}
const $main = document.getElementById('main')
const scaleToFix = function () {
  const windowW = document.documentElement.clientWidth || document.body.clientWidth
  const mainWidth = parseInt(getComputedStyle($main).width)
  const scale = windowW / 100
  $main.style.webkitTransform = `scale(${scale})`
  $main.style.transform = `scale(${scale})`
  $main.style.marginLeft = (windowW - (mainWidth * scale)) / 2 + 'px'
  $main.style.display = 'block'
}
const main = function () {
  ReactDom.render(<Enter/>, document.getElementById('main'))
}
window.onload = function () {
  scaleToFix()
  main()
}

