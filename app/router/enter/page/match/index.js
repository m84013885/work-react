'use strict'
import style from './style.css'
import { View, ScrollView, Circle, Swiper, SwiperItem } from '../../../../components'

class Match extends React.Component {
  static propTypes = {
    // 传入值类型
    // optionalArray: PropTypes.array,
    // optionalBool: PropTypes.bool,
    // optionalFunc: PropTypes.func,
    // optionalNumber: PropTypes.number,
    // optionalObject: PropTypes.object,
    // optionalString: PropTypes.string
    rank: PropTypes.string,
    rankScore: PropTypes.number,
    game: PropTypes.number
    // rank
    // rankScore
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
    const { rank, rankScore, game } = this.props
    if (game > 0) {
      return (
        <View className={style.gameMatch}></View>
      )
    }
    else {
      return (
        <View className={style.match}>
          <View className={style.rank}>排名：<View className={style.rankContent}>{rank}</View></View>
          <View className={style.rankTop}>累计距离</View>
          <View className={style.rank}>{rankScore}M</View>
        </View>
      )
    }
  }
}

export default Match
