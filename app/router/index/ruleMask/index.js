'use strict'
import style from './style.css'
import { View, ScrollView, Circle, Swiper, SwiperItem } from '../../../components/src'

class Rule extends React.Component {
  static propTypes = {
    // 传入值类型
    // optionalArray: PropTypes.array,
    // optionalBool: PropTypes.bool,
    rule: PropTypes.bool,
    // optionalFunc: PropTypes.func,
    handleChangeRule: PropTypes.func
    // optionalNumber: PropTypes.number,
    // optionalObject: PropTypes.object,
    // optionalString: PropTypes.string
  }
  static defaultProps = {
    // 传入的默认值
  }
  componentDidMount () {
    // 生命周期
  }
  state = {
    // 状态码
    close: false
  }
  closeAnimation = this.closeAnimation.bind(this)
  closeAnimation (e) {
    const handleChangeRule = this.props.handleChangeRule
    e.persist()
    if (e.animationName.indexOf('modalBoxHideAnima') !== -1) {
      this.setState({
        close: !this.state.close
      })
      handleChangeRule()
    }
  }
  closeRule = this.closeRule.bind(this)
  closeRule () {
    this.setState({
      close: !this.state.close
    })
  }
  render () {
    const close = this.state.close
    const rule = this.props.rule

    return (
      <View className={rule ? style.rule : style.none}>
        <View className={close ? style.maskHide : style.mask} tap={this.closeRule}></View>
        <View animationEnd={this.closeAnimation} className={close ? style.ruleContentHide : style.ruleContent}>
          <View className={style.ruleImage}></View>
        </View>
      </View>
    )
  }
}

export default Rule
