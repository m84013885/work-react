'use strict'
import React from 'react'
import style from './style.css'
import { View, ScrollView, Circle, Swiper, SwiperItem } from '../../../../components'

class Result extends React.Component {
  static propTypes = {
    // 传入值类型
    // optionalArray: PropTypes.array,
    // optionalBool: PropTypes.bool,
    // optionalFunc: PropTypes.func,
    // optionalNumber: PropTypes.number,
    // optionalObject: PropTypes.object,
    pk: PropTypes.object,
    // optionalString: PropTypes.string
    topHeaderUrl: PropTypes.string,
    topHeaderName: PropTypes.string,
    result: PropTypes.number,
    mvp: PropTypes.bool
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
  _render () {
    const result = this.props.result // 1 胜利，2 失败，3平局
    const mvp = this.props.mvp
    const topHeaderUrl = this.props.topHeaderUrl
    const topHeaderName = this.props.topHeaderName
    const {
      myHeadurl,
      myPoint,

      opHeadurl,
      opPoint
    } = this.props.pk
    if (result === 1) {
      if (mvp) {
        return (
          <View className={style.mvp}>
            <View className={style.mvpText}>本场MVP</View>
            <View className={style.mvpHeadUrl}></View>
            <View className={style.mvpUrl} style={{ backgroundImage: `url(${topHeaderUrl})` }}></View>
            <View className={style.mvpName}>{topHeaderName}</View>
          </View>
        )
      }
      else {
        return (
          <View className={style.pk}>
            <View className={style.left}>
              <View className={style.headerUrl} style={{ backgroundImage: `url(${myHeadurl})` }}>
                <View className={style.win}></View>
              </View>
              <View className={style.score}>{myPoint}M</View>
            </View>
            <View className={style.right}>
              <View className={style.headerUrl} style={{ backgroundImage: `url(${opHeadurl})` }}></View>
              <View className={style.score}>{opPoint}M</View>
            </View>
            <View className={style.timeBall}>VS</View>
          </View>
        )
      }
    }
    else if (result === 2) {
      return (
        <View className={style.lose}>
          <View className={style.loseText}>龙舟竞赛失败</View>
          <View className={style.loseText}>下局再接再厉</View>
        </View>
      )
    }
    else if (result === 3) {
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
          <View className={style.timeBall}>平局</View>
        </View>
      )
    }
  }
  render () {
    return (
      <React.Fragment>
        {this._render()}
      </React.Fragment>
    )
  }
}

export default Result
