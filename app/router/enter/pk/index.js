'use strict'
import React from 'react'
import style from './style.css'
import { View, ScrollView, Circle, Swiper, SwiperItem } from '../../../components/src'

class Pk extends React.Component {
  static propTypes = {
    // 传入值类型
    // optionalArray: PropTypes.array,
    // optionalBool: PropTypes.bool,
    // optionalFunc: PropTypes.func,
    // optionalNumber: PropTypes.number,
    // optionalObject: PropTypes.object,
    pk: PropTypes.object
    // optionalString: PropTypes.string
  }
  static defaultProps = {
    // 传入的默认值
  }
  componentDidMount () {
    // 生命周期
    this.beginTaskTimer()
  }
  state = {
    // 状态码
    bufferTimeRemain: 100
  }
  beginTaskTimer () {
    const { bufferTime } = this.props.pk
    const fTime = parseInt(bufferTime / 1000)
    this.setState({ bufferTimeRemain: fTime })
    this.startTaskTimer(fTime)
  }
  startTaskTimer (timeCount) {
    if (timeCount <= 0) { return }
    clearTimeout(this.taskTimer)
    let count = 0
    const startTime = new Date().getTime()
    const timeoutCallback = () => {
      timeCount--
      count++
      if (timeCount < 0) {
        this.setState({ timerOver: true })
        clearTimeout(this.taskTimer)
        return
      }
      this.setState({ bufferTimeRemain: timeCount })
      const offset = new Date().getTime() - (startTime + count * 1000)
      let nextTime = 1000 - offset
      if (nextTime < 0) {
        nextTime = 0
      }
      this.taskTimer = setTimeout(timeoutCallback, nextTime)
    }
    this.taskTimer = setTimeout(timeoutCallback, 1000)
  }
  renderView () {
    const {
      myHeadurl,
      myPoint,

      opHeadurl,
      opPoint
    } = this.props.pk
    const bufferTimeRemain = this.state.bufferTimeRemain
    return (
      <View className={style.pk}>
        <View className={style.left}>
          <View className={style.headerUrl} style={{ backgroundImage: `url(${myHeadurl})` }}></View>
          <View className={style.score}>{myPoint}M</View>
        </View>
        <View className={style.right}>
          <View className={style.headerUrl} style={{ backgroundImage: `url(${opHeadurl})` }}></View>
          <View className={style.score}>{opPoint}M</View>
        </View>
        <View className={style.timeBall}>{bufferTimeRemain}</View>
      </View>
    )
  }
  render () {
    return (
      <React.Fragment>
        {this.renderView()}
      </React.Fragment>
    )
  }
}

export default Pk
