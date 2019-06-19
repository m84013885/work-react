'use strict'
import style from './index.css'

import { App, View } from '../../../components'

class Index extends React.Component {
  state = {

  }
  componentDidMount () {

  }
  _renderData () {
    let { rain_number, bless } = serverData
    if (!rain_number) {
      rain_number = 0
    }
    if (!bless) {
      bless = 0
    }
    return {
      rain_number,
      bless
    }
  }
  render () {
    const { rain_number, bless } = this._renderData()
    return (
      <App noSysScroll={false}>
        <View className={style.app}>
          <View className={style.banner}></View>
          <View className={style.title}>
          已发放红包雨 <span className={style.titleColor}>{rain_number}</span> 场
          </View>
          <View className={style.showBox}>
            <View className={style.progress}>
              <View className={style.light}></View>
              <View className={style.progressContent} style={{ width: ((bless % 3000000) / 3000000) * 100 + '%' }}></View>
            </View>
            <View className={style.number}>祝福值 <span className={style.numberColor}>{((bless % 3000000))}/3000000</span></View>
          </View>
          <View className={style.guafenbaiwan}></View>
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
