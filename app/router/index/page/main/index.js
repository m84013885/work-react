'use strict'
import style from './style.css'
import { View, ScrollView, Circle, Swiper, SwiperItem } from '../../../../components'

import List from './list'

import { goLive, goIndex } from '../../../../utils/goto'

class Main extends React.Component {
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
    this.setState({
      arr1: window.serverData.listActor,
      arr2: window.serverData.listContribute
    })
  }
  followBothRank = this.followBothRank.bind(this)
  followBothRank (uid) {
    const set = this.state.set
    const arr = set ? this.state.arr1 : this.state.arr2
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      if (item.uid === uid) {
        item.follow = 1
      }
    }
    if (set) {
      this.setState({ arr1: arr })
    }
    else {
      this.setState({ arr2: arr })
    }
  }
  state = {
    // 状态码
    arr1: [],
    arr2: [],
    set: true
  }
  gotoLive (live, uid, source, platform_id) {
    if (window.serverData.isAnchor) {
      return
    }
    if (!window.serverData.inapp_info) {
      window.location.href = window.serverData.download
      return
    }
    const args = { uid, source, platform_id }
    // 直播间
    if (live === 1) {
      goLive(args)
    }
    else {
      goIndex(args)
    }
  }
  handleChangeBtn1 = this.handleChangeBtn1.bind(this)
  handleChangeBtn1 () {
    this.setState({
      set: true
    })
  }
  handleChangeBtn2 = this.handleChangeBtn2.bind(this)
  handleChangeBtn2 () {
    this.setState({
      set: false
    })
  }
  _renderBtn () {
    const set = this.state.set
    if (set) {
      return (
        <View className={style.btnBox}>
          <View className={style.liveBtn1}></View>
          <View className={style.userBtn2} tap={this.handleChangeBtn}></View>
        </View>
      )
    }
    else {
      return (
        <View className={style.btnBox}>
          <View className={style.liveBtn2} tap={this.handleChangeBtn}></View>
          <View className={style.userBtn1}></View>
        </View>
      )
    }
  }
  _renderRanking () {
    const set = this.state.set
    const arr = set ? this.state.arr1 : this.state.arr2
    if (arr.length >= 3) {
      return (
        <View>
          <View className={style.ranking}>
            <View className={style.rankingTextBox}>
              <View className={style.rankingTextContent}>
                <View className={style.overflowText}>{arr[1].name}</View>
                <View className={style.overflowText}>{arr[1].num}M</View>
              </View>
              <View className={`${style.rankingTextContent} ${style.rankingTextContent1}`}>
                <View className={style.overflowText}>{arr[0].name}</View>
                <View className={style.overflowText}>{arr[0].num}M</View>
              </View>
              <View className={style.rankingTextContent}>
                <View className={style.overflowText}>{arr[2].name}</View>
                <View className={style.overflowText}>{arr[2].num}M</View>
              </View>
            </View>
          </View>
          <View className={style.headerUrlBox}>
            <View className={style.headerUrl} style={{ backgroundImage: `url(${arr[1].headurl})` }} tap={() => { this.gotoLive(arr[1].live, arr[1].uid, arr[1].source, arr[1].platform_id) }} ></View>
            <View className={`${style.headerUrl} ${style.headerUrl1}`} style={{ backgroundImage: `url(${arr[0].headurl})` }} tap={() => { this.gotoLive(arr[0].live, arr[0].uid, arr[0].source, arr[0].platform_id) }}></View>
            <View className={style.headerUrl} style={{ backgroundImage: `url(${arr[2].headurl})` }} tap={() => { this.gotoLive(arr[2].live, arr[2].uid, arr[2].source, arr[2].platform_id) }}></View>
          </View>
        </View>
      )
    }
    else {
      return <View></View>
    }
  }
  _renderList () {
    const set = this.state.set
    const arr = set ? this.state.arr1 : this.state.arr2
    if (arr.length > 3) {
      const list = arr.slice(3)
      const res = list.map((content, index) => {
        return <List content={content} key={index} gotoLive={this.gotoLive} followBothRank={this.followBothRank}/>
      })
      return res
    }
    else {
      return <View></View>
    }
  }
  render () {
    return (
      <View className={style.content}>
        <View>
          <View className={style.btn1} tap={this.handleChangeBtn1}></View>
          <View className={style.btn2} tap={this.handleChangeBtn2}></View>
          {this._renderBtn()}
        </View>
        {this._renderRanking()}
        <View>{this._renderList()}</View>

      </View>
    )
  }
}

export default Main
