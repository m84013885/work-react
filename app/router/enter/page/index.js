'use strict'
import style from './index.css'

import Match from './match'
import Pk from './pk'
import Result from './result'
import TreasureBox from './treasure-box'

import msgpack from 'msgpack-lite'
import { Int64BE } from 'int64-buffer'

import { View } from '../../../components'
import { sigFuncWebSocket } from '../../../utils/sig'
import mustParam from '../../../utils/must'

import { toUrl } from '../../../utils/goto'

const anchor = serverData.anchor
const guser = serverData.user
const dataURL = serverData.dataURL
const source_id = guser.source_id
const source = guser.source
const mc_uid = anchor.mc_uid
const mc_source = anchor.mc_source
const router = serverData.router

class Index extends React.Component {
  state = {
    // 宝箱
    msg41: {
      s: 0, // 宝箱状态
      d: 0, // 宝箱id
      t: 0, // 宝箱不可点击时的倒计时
      c: 0, // 宝箱可点击时的倒计时
      n: 0, // 剩余宝箱个数
      e: '', // 奖励文案，可能没有此字段
      u: 0 // 用户津贴数
    },
    game: 0,

    mvp: false,
    topHeaderUrl: 'https://static.app-remix.com/bobo/images/announcements/main.png',
    topHeaderName: '123435',
    // 状态码
    pkStatus: 0, // 1显示匹配中,2pk中,3结果

    rank: '12',
    rankScore: 1000,

    result: 1, // 1 胜利，2 失败，3平局

    pk: {
      status: 101,

      pkTime: 1000, // 本轮pk倒计时
      bufferTime: 100000, // buffer加成倒计时

      giftName: '荧光棒', // 礼物名
      giftCountTotal: 100, // 礼物总个数
      giftCount1: 0, // 收到的礼物个数
      giftCount2: 0,

      bufferResult: 0, // buffer结果,1成功,2失败

      myName: '123',
      myPoint: '123',
      myHeadurl: 'https://avatar.app-remix.com/Z5AHMYVYVRP72DIO.jpg?imageMogr2/thumbnail/100x100/auto-orient',
      opName: '123',
      opPoint: '123',
      opHeadurl: 'https://avatar.app-remix.com/Z5AHMYVYVRP72DIO.jpg?imageMogr2/thumbnail/100x100/auto-orient'
    }

  }
  componentDidMount () {
    this.initWsParam()
  }
  link () {
    const paramer = mustParam()
    paramer.mc_uid = mc_uid
    paramer.source = source
    paramer.mc_source = mc_source
    paramer.source_id = source_id
    paramer.router = router
    const sigObj = sigFuncWebSocket(paramer)
    const url = `${dataURL}?sig=${sigObj.sig}&${sigObj.str}`
    this.wsURL = url
    this.linkWs()
  }
  initWsParam () {
    this.link()
  }
  linkWs () {
    if (this.reTimes >= 300) {
      console.log('重连结束')
      return
    }
    this.reTimes++
    let ws = null
    try {
      ws = new WebSocket(this.wsURL)
    }
    catch (error) {
      // 发生错误重新连接
      console.log('catch')
      this.link()
      return
    }
    this.ws = ws
    ws.binaryType = 'arraybuffer'
    let heartbeat = 0
    ws.onopen = () => {
      // 发送心跳包
      this.reTimes = 0
      window.console.log('连接成功')
      this.error = null
      heartbeat = setInterval(() => {
        const ts = new Date().getTime()
        const data = {
          i: Int64BE(source_id),
          d: Int64BE(0),
          p: 10005,
          o: parseInt(source),
          t: Int64BE(ts),
          b: Int64BE(ts),
          m: '',
          c: Int64BE(mc_uid),
          n: parseInt(mc_source)
        }
        const buffer = msgpack.encode(data)
        ws.send(buffer)
      }, 15 * 1000)
    }
    ws.onmessage = (evt) => {
      const arrayBuffer = evt.data
      const u8Array = new Uint8Array(arrayBuffer)
      const options = {
        codec: msgpack.createCodec({
          int64: true
        })
      }
      const data = msgpack.decode(u8Array, options)
      // 消息
      this.linkMess(data)
    }
    ws.onclose = () => {
      this.reTimes = 0
      window.console.log('断开连接,1秒后重连')
      clearInterval(heartbeat)
      setTimeout(() => this.linkWs(), 1000)
      window.console.log('关闭链接')
    }
    ws.onerror = (e) => {
      this.reTimes = 0
      // 错误处理
      window.console.log(e)
      this.error = e
      ws.close()
    }
    this.ws = ws
  }
  linkMess (data) {
    const { m, p } = data
    if (p === 10098 || p === 10099) {
      this.handleEnterMessage(m)
    }
    else if (p === 10100 || p === 10101) {
      // pk消息
      this.boxId = m.d.toString()

      const nextState = {
        msg41: m
      }
      this.setState(nextState)
    }
  }
  handleEnterMessage (m) {
    if (m.tr && m.ta) {
      this.setState({
        trank: m.tr,
        score: m.ta
      })
      if (m.ge) {
        this.setState({
          game: m.ge
        })
      }
      else if (m.gv) {
        this.setState({
          game: m.gv
        })
      }
      else {
        this.setState({
          game: 0
        })
      }
    }
    console.log(m)
    const nextState = {}
    if (m.a === 0 || m.a === 2) { // 显示匹配中
      nextState.pkStatus = 1
      nextState.rank = m.k // 排名
      nextState.rankScore = m.c // 排位分
    }
    else if (m.a === 1 && m.es === 111) { // 显示结果
      if (m.et > 3000) {
        setTimeout(() => {
          this.setState({
            mvp: true
          })
        }, m.et - 3000)
      }
      else if (m.et > 0) {
        this.setState({
          mvp: true
        })
      }
      nextState.topHeaderUrl = m.ph
      nextState.topHeaderName = m.pn

      nextState.pkStatus = 3
      nextState.result = m.g || 0 // 1 胜利，2 失败，3平局
    }
    else if (m.a === 3 && (m.es >= 102 && m.es <= 111)) { // pk,ko,task,buffer
      nextState.pkStatus = 2
      nextState.pk = this.state.pk
      nextState.pk.status = m.es
      nextState.pk.pkTime = m.t // 本轮pk倒计时
      nextState.pk.bufferTime = m.et // buffer加成倒计时
      nextState.pk.giftName = m.tg // 礼物名
      nextState.pk.giftCountTotal = m.tl || 0 // 礼物总个数
      nextState.pk.giftCount1 = m.tc || 0 // 收到的礼物个数
      nextState.pk.bufferResult = m.tr || 0 // buffer结果
      nextState.pk.myName = m.n1
      nextState.pk.myPoint = m.p1 || 0
      nextState.pk.myHeadurl = m.h1 || ''
      nextState.pk.opName = m.n2
      nextState.pk.opPoint = m.p2 || 0
      nextState.pk.opHeadurl = m.h2 || ''
      nextState.pk.giftCount2 = m.to || 0
    }
    else {
      nextState.pkStatus = 1
      nextState.rank = m.k // 排名
      nextState.rankScore = m.c // 排位分
    }
    this.setState(nextState)
  }
  _renderPkStatus () {
    const pkStatus = this.state.pkStatus
    if (pkStatus === 1) {
      const { rank, rankScore, game } = this.state
      return <Match rank={rank} rankScore={rankScore} game={game}/>
    }
    else if (pkStatus === 2) {
      const { pk } = this.state
      return <Pk pk={pk}/>
    }
    else if (pkStatus === 3) {
      const { result, pk, mvp, topHeaderUrl, topHeaderName } = this.state
      return <Result result={result} pk={pk} mvp={mvp} topHeaderUrl={topHeaderUrl} topHeaderName={topHeaderName}/>
    }
  }
  handleGetPrize = () => {
    const { msg41 } = this.state
    if (msg41.s === 2) {
      console.log('领取宝箱')
      const giftSentObj = {
        'm': {
          'd': Int64BE(this.boxId)
        },
        'p': 10102,
        'i': Int64BE(source_id),
        'o': parseInt(source),
        'c': Int64BE(mc_uid),
        'n': parseInt(mc_source)
      }
      console.log(giftSentObj)
      const buffer = msgpack.encode(giftSentObj)
      this.ws.send(buffer)
    }
  }
  handleGoToUrl () {
    toUrl(window.serverData.activityURL)
  }
  render () {
    const msg41 = this.state.msg41
    return (
      <View className={style.app}>
        <View tap={this.handleGoToUrl}>
          {this._renderPkStatus()}
        </View>
        <TreasureBox msg={msg41} onGetPrize={this.handleGetPrize}/>
      </View>
    )
  }
}

export default Index
