'use strict'
import style from './style.css'
import { View, ScrollView, Circle, Swiper, SwiperItem } from '../../../components/src'

class Rule extends React.Component {
  static propTypes = {
    // 传入值类型
    // optionalArray: PropTypes.array,
    // optionalBool: PropTypes.bool,
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
  }
  render () {
    const handleChangeRule = this.props.handleChangeRule
    return (
      <View className={style.rule} tap={handleChangeRule}></View>
    )
  }
}

export default Rule
