'use strict'
import style from './index.css'

import { App, View } from '../../../components'

class Index extends React.Component {
  state = {

  }
  componentDidMount () {

  }
  _renderUserInfo () {
    const anchor = serverData.anchor
    const { name, headurl } = anchor
    const status = serverData.status
    if (parseInt(anchor.mc_source) === 0) {
      return false
    }
    else {
      return (
        <View className={style.zhubo}>
          <View className={style.zhuboMess}>
            <View className={style.zhuboUrl} style={{ backgroundImage: `url(${headurl})` }}></View>
            <View className={style.zhuboName}>{name}</View>
          </View>
          <View className={style.zhuboList}>
            <View className={style.zhuboListFlex}>
              <View className={status[0] ? style.zhuboGiftm2 : style.zhuboGiftm1}></View>
              <View className={status[1] ? style.zhuboGiftz2 : style.zhuboGiftz1}></View>
              <View className={status[2] ? style.zhuboGifth2 : style.zhuboGifth1}></View>
            </View>
            <View className={style.zhuboListFlex}>
              <View className={status[3] ? style.zhuboGifts2 : style.zhuboGifts1}></View>
              <View className={status[4] ? style.zhuboGiftq2 : style.zhuboGiftq1}></View>
              <View className={status[5] ? style.zhuboGiftt2 : style.zhuboGiftt1}></View>
            </View>
          </View>
        </View>
      )
    }
  }
  render () {
    const anchor = this._renderUserInfo()
    return (
      <App noSysScroll={false}>
        <View className={style.app}>
          <View className={style.banner}></View>
          {anchor}
          <View className={anchor ? style.huodongzenmewan1 : style.huodongzenmewan}></View>
          <View className={style.jianglishuoming}></View>
          <View className={style.footer1}>活动与苹果公司无关</View>
          <View className={style.footer2}>活动最终解释权归本直播平台所有</View>
        </View>
      </App>
    )
  }
}

export default Index
