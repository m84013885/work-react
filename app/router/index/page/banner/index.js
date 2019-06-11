'use strict'
import style from './style.css'
import { View, ScrollView, Circle, Swiper, SwiperItem } from '../../../../components'
if (module.hot) {
  module.hot.accept()
}
class Banner extends React.Component {
  static propTypes = {
    // 传入值类型
    // optionalArray: PropTypes.array,
    // optionalBool: PropTypes.bool,
    // optionalFunc: PropTypes.func,
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
    return (
      <View className={style.banner}></View>
    )
  }
}

export default Banner
