'use strict'
import style from './index.css'
import React from 'react'

import TreasureBox from './treasure-box'

import msgpack from 'msgpack-lite'
import { Int64BE } from 'int64-buffer'

import { View, Swiper, SwiperItem } from '../../../components'

import mustParam from '../../../utils/must'

import { asyncFetch, sigFunc } from '../../../utils/helper'

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
    state: serverData.state,
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
    current: 0,
    sd: 0,
    gd: 0,
    cake: 0,

    // 第二阶段默认状态码
    s: 0, rs: 0, t: 0, cn: 0, i: 0, o: 0, p: 0, c: 0, nn: 0,
    tt: 0 // 倒计时用的毫秒
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
    const sigObj1 = sigFunc(paramer)
    const url = `${dataURL}?${sigObj1}`
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
      // window.console.log('连接成功')
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
    if (p >= 10103 && p <= 10110) {
      if (p === 10108) {
        this.setState({
          state: 1
        })
      }
      else if (p === 10110) {
        this.setState({
          state: 2
        })
      }
    }
    if (p === 10108) {
      this.handleEnterMessage1(m)
    }
    else if (p === 10103 || p === 10104) {
      this.handleEnterMessage2(m)
    }
    else if (p === 10109 || p === 10110) {
      this.handleEnterMessage3(m)
    }
    else if (p === 10105 || p === 10106) {
      // 宝箱消息
      this.boxId = m.d.toString()
      const nextState = {
        msg41: m
      }
      this.setState(nextState)
    }
  }
  handleEnterMessage1 (m) {
    // 第一阶段
    let { sd, gd } = m
    !sd ? sd = 0 : ''
    !gd ? gd = 0 : ''
    this.setState({
      sd: sd,
      gd: gd
    })
  }
  handleEnterMessage2 (m) {
    // 蛋糕阶段
    let { cc } = m
    !cc ? cc = 0 : ''
    this.setState({
      cake: cc
    })
  }
  handleEnterMessage3 (m) {
    console.log(m)
    // 红包阶段
    const s = m.s
    // 0为默认状态，1为红包雨状态
    this.setState({ s })
    if (s === 0) {
      // p福气总量
      // nn整点字符串
      // c整点红包雨次数
      const { p, nn, c } = m
      this.setState({
        p, c, nn
      })
    }
    else if (s === 1) {
      // rs红包雨阶段状态,0为无红包,1倒计时阶段,2抢红包阶段,3本场结束阶段
      // o本次整点几次红包雨
      // t红包雨倒计时
      // cn整点字符串
      // i当前第几场红包雨
      const { rs, t, cn, i, o } = m
      if (rs === 1) {
        this._renderTime(t)
      }
      this.setState({
        rs, cn, i, o
      })
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
        'p': 10107,
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
  handleGoToUrl = this.handleGoToUrl.bind(this)
  handleGoToUrl () {
    const { current } = this.state
    const state = this.state.state
    switch (current) {
      case 0:
        if (state === 1) {
          toUrl(window.serverData.activityURL)
        }
        else {
          toUrl(window.serverData.activityHongbaoURL)
        }
        break
      case 1:
        toUrl(window.serverData.activityCakeURL)
        break
    }
  }
  handleSlideChange = this.handleSlideChange.bind(this)
  handleSlideChange (e) {
    this.setState({
      current: e.realIndex
    })
  }
  _renderTime (t) {
    if (!this.timer) {
      this.setState({
        t: parseInt(t / 1000),
        tt: parseInt(t / 1000)
      })
      this.timer = setInterval(() => {
        if (this.state.tt < 1) {
          clearInterval(this.timer)
          this.timer = null
        }
        else {
          this.setState({
            tt: this.state.tt - 1
          })
        }
      }, 1000)
    }
  }
  _renderHongbao () {
    const { s, p, nn, c } = this.state
    if (s === 0) {
      return (
        <View>
          <View className={style.hongbaoTitle}>当前祝福值</View>
          <View className={style.hongbaoContent}>{(p % 3000000)}</View>
          <View className={style.hongbaoFooter}><span className={style.hongbaoFooterColor}>{nn}</span>有<span className={style.hongbaoFooterColor}>{c}</span>场红包雨</View>
        </View>
      )
    }
    else if (s === 1) {
      const { rs, cn, t, o, tt } = this.state
      if (rs === 1) {
        return (
          <View>
            <View className={`${style.hongbaoTimeFooter} ${style.hongbaoTimeMargin}`}><span className={style.hongbaoFooterColor}>{cn}</span>天降红包雨</View>
            <View className={style.progress}>
              <View className={style.light}></View>
              <View className={style.progressContent} style={{ width: (tt / t) * 100 + '%' }}></View>
              <View className={style.progressTime}>倒计时 {tt}s</View>
            </View>
          </View>
        )
      }
      else {
        return (
          <View>
            <View className={style.hongbaoTime}>{cn}</View>
            <View className={style.hongbaoTimeFooter}>将触发<span className={style.hongbaoFooterColor}>{o}</span>场红包雨</View>
          </View>
        )
      }
    }
  }
  _renderSwiper () {
    const state = this.state.state
    const { sd, gd, cake, current } = this.state
    if (state === 2) {
      return (
        <View>
          <Swiper onTap={this.handleGoToUrl} current={current} onSlideChange={this.handleSlideChange} autoplay={true} interval={4000}>
            <SwiperItem>
              <View className={style.hongbaoBox}>
                <View className={style.hongbaoHeader}></View>
                {this._renderHongbao()}
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className={style.cakeBg} >
                <View className={style.cakeText}>当前主播已集</View>
                <View className={style.cakeContent}><span className={style.contentColor}>{cake}</span> 个</View>
              </View>
            </SwiperItem>
          </Swiper>
          <View className={style.indicatorBox} style={{ display: state === 2 ? 'block' : 'none' }}>
            <View className={current === 0 ? style.indicatorActive : style.indicator}></View>
            <View className={current === 1 ? style.indicatorActive : style.indicator}></View>
          </View>
        </View>
      )
    }
    else if (state === 1) {
      return (
        <Swiper onTap={this.handleGoToUrl} current={current} onSlideChange={this.handleSlideChange}>
          <SwiperItem >
            <View className={style.enterBg} >
              <View className={style.title}>我的抽奖次数</View>
              <View className={style.content}><span className={style.contentColor}>{sd}</span> 白银，<span className={style.contentColor}>{gd}</span> 黄金</View>
            </View>
          </SwiperItem>
        </Swiper>
      )
    }
  }
  render () {
    const msg41 = this.state.msg41
    return (
      <View className={style.app}>
        {this._renderSwiper()}
        <TreasureBox msg={msg41} onGetPrize={this.handleGetPrize}/>
      </View>
    )
  }
}

export default Index
