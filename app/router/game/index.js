/* eslint-disable */
'use strict'

import 'whatwg-fetch'
import '../../utils/resize'
import Page from './page'
if (module.hot) {
  module.hot.accept()
}
const main = function () {
  ReactDom.render(<Page/>, document.getElementById('main'))
}

window.onload = function () {
  main()
}

