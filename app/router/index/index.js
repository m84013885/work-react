/* eslint-disable */
'use strict'
import '../../utils/resize'
import Enter from './enter'
import share from '../../utils/share'

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

