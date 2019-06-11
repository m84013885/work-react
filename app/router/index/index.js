/* eslint-disable */
'use strict'
import '../../utills/resize'
import Enter from './enter'
import share from '../../utills/share'

if (module.hot) {
  module.hot.accept()
}
const main = function () {
  ReactDom.render(<Enter/>, document.getElementById('main'))
}
window.onload = function () {
  if(serverData.share){
    share()
  }
  main()
}

