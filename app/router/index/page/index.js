'use strict'
import style from './index.css'

import { App, View } from '../../../components'

import { goCharge } from '../../../utils/goto'

class Index extends React.Component {
  state = {

  }
  componentDidMount () {

  }
  handleGoCharge () {
    if (window.serverData.isAnchor) {
      return
    }
    if (!window.serverData.inapp_info) {
      window.location.href = window.serverData.download
      return
    }
    goCharge()
  }
  render () {
    const { gold, silver } = serverData
    return (
      <App noSysScroll={false}>
        <View className={style.app}>
          <View className={style.banner}></View>
          <View className={style.choujiang}>
            <View className={style.choujiangText}>
            你的抽奖机会  <span className={style.choujiangTextColor}>{silver}</span> 白银，<span className={style.choujiangTextColor}>{gold}</span> 黄金
            </View>
          </View>
          <View className={style.btnBg} tap={this.handleGoCharge}>
            <View className={style.btn}>
              <View className={style.btnText}>立即获得</View>
              <View className={style.btnText}>抽奖机会</View>
            </View>
          </View>
          <View className={style.kuanghuanpa}></View>
          <View className={style.yinghaoche}></View>
          <View className={style.guize}></View>
          <View className={style.tuoyuan1}></View>
          <View className={style.tuoyuan2}></View>
          <View className={style.tuoyuan3}></View>
        </View>
      </App>
    )
  }
}

export default Index
