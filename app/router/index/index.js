/* eslint-disable */
'use strict'
import '../../utils/resize'
import Page from './page'
import share from '../../utils/share'

const main = function () {
  ReactDom.render(<Page/>, document.getElementById('main'))
}
window.onload = function () {
  if(serverData.share){
    share()
  }
  main()
}

