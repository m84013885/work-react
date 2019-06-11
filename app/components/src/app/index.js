'use strict'
import style from '../css.css'
import View from '../container/view'
import Toast from '../mask/toast'
import Copy from '../mask/copy'
import scrollSetting from '../config/scrollOut'
class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    noSysScroll: PropTypes.bool
  }
  static defaultProps = {
    children: null,
    noSysScroll: true
  }
  constructor (props) {
    super(props)
    // APP 初始化就禁止document的默认事件
    if (this.props.noSysScroll) { scrollSetting() }
  }
  _copyHandle () {}
  render () {
    return (
      <View className={style.main} >
        <View className={style.app}>{ this.props.children }</View>
        <Toast />
        <Copy />
      </View>
    )
  }
}

export default App
