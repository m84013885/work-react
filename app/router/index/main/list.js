'use strict'
import style from './style.css'
import { View } from '../../../components/src'

import { sigFuncPost } from '../../../utills/sig'
import mustParam from '../../../utills/must'
import asyncFetch from '../../../utills/asyncFetch'

class List extends React.Component {
  static propTypes = {
    // 传入值类型
    // optionalArray: PropTypes.array,
    // optionalBool: PropTypes.bool,
    // optionalFunc: PropTypes.func,
    gotoLive: PropTypes.func,
    followBothRank: PropTypes.func,
    // optionalNumber: PropTypes.number,
    // optionalObject: PropTypes.object,
    content: PropTypes.object
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
  gotoLive (live, uid, source, platform_id) {
    const gotoLive = this.props.gotoLive
    gotoLive(live, uid, source, platform_id)
  }

  handleFollow = this.handleFollow.bind(this)
  async handleFollow (uid, source, follow) {
    if (follow === 1 || this.requesting) {
      return
    }
    this.requesting = true
    try {
      const { apiURL, user_info } = window.serverData
      const paramer = mustParam()
      const body = {
        source: user_info.source,
        source_id: user_info.uid,
        to_source: source,
        to_source_id: uid
      }
      const sigObj = sigFuncPost(paramer, body)
      const url = `${apiURL}?sig=${sigObj.sig}&${sigObj.str}`
      const res = await asyncFetch({
        url: url,
        method: 'POST',
        obj: body
      })
      this.requesting = false
      if (res.err !== 0) {
        window.Qapp.showToast({ content: res.err_msg })
        return false
      }
      this.props.followBothRank(uid)
    }
    catch (err) {
      this.requesting = false
      window.Qapp.showToast({ content: '服务器异常' })
    }
  }
  render () {
    const { rank, num, follow, name, live, headurl, platform_id, source, uid } = this.props.content

    return (
      <View className={style.container}>
        <View className={style.rank}>{rank}</View>
        <View className={style.head} style={{ backgroundImage: `url(${headurl})` }} tap={() => { this.gotoLive(live, uid, source, platform_id) }}>
          <View className={live === 1 ? style.live : ''}></View>
        </View>
        <View className={style.listContent}>
          <View className={style.listName}>{name}</View>
          <View className={style.listNum}>{num}M</View>
        </View>
        <View className={style.center}></View>
        <View className={follow === 1 ? style.nowatch : style.watch} tap={() => { this.handleFollow(uid, source, follow) }}></View>
      </View>
    )
  }
}

export default List
