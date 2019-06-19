'use strict'
import style from './index.css'

import { View } from '../../../../components'

import { asyncFetch, sigFunc } from '../../../../utils/helper'

class Animation extends React.Component {
  static propTypes = {
    delay: PropTypes.number
  }
  static defaultProps = {
    delay: 0
  }
  state = {
    randomLeft: 0,
    cloud: 0,
    cloudTop: 0

  }
  componentDidMount () {
    const domWidth = parseFloat(getComputedStyle(this.dom).width)
    const windowW = document.documentElement.clientWidth || document.body.clientWidth
    const randomLeft = parseInt(Math.random() * (windowW - domWidth) + 1)
    this.setState({
      randomLeft
    })
  }
  getDom (dom) {
    this.dom = dom
  }
  closeAnimation = this.closeAnimation.bind(this)
  closeAnimation (e) {
    e.persist()
    this.dom.remove()
  }
  handleClick = this.handleClick.bind(this)
  async handleClick () {
    const { activityURL, random, redpacketid, user, room_id, token } = serverData
    const { source_id, source } = user
    if (Math.random() < random) {
      const res = await asyncFetch({ url: activityURL, method: 'POST', query: { token, redpacketid, room_id, source_id, source }})
      if (res.err === 0) {
        window.Qapp.showToast({ content: `恭喜你抢到[${res.rwd}]` })
      }
      else {
        window.Qapp.showToast({ content: '呼~很遗憾，红包已经被抢走了' })
      }
    }
    else {
      window.Qapp.showToast({ content: '呼~很遗憾，红包已经被抢走了' })
    }

    const top = getComputedStyle(this.dom).top

    const timer = setInterval(() => {
      const cloud = this.state.cloud
      if (cloud > 8) {
        clearInterval(timer)
        this.dom.remove()
      }
      this.setState({
        cloudTop: top,
        cloud: cloud + 1
      })
    }, 100)
  }
  render () {
    const randomLeft = this.state.randomLeft
    const cloud = this.state.cloud
    const cloudTop = this.state.cloudTop
    const N = parseInt(Math.random() * (10) + 1)
    const D = parseInt(Math.random() * (10) + 1)
    const S = parseFloat('1.' + parseInt(Math.random() * 10))
    const delay = this.props.delay
    return (
      <View
        tap={this.handleClick}
        style={{ width: 90 * S + 'px', height: 116 * S + 'px', left: randomLeft + 'px', animationDelay: delay + 's', WebkitAnimationDelay: delay + 's' }}
        className={cloud ? style.none : `${style['petalN' + N]} ${style['petalD' + D]}`} getRef={(dom) => { this.getDom(dom) }}
        animationEnd={this.closeAnimation}>
        <View style={{ top: cloudTop, left: randomLeft + 'px', width: 90 * S + 'px', height: 116 * S + 'px' }} className={cloud ? style['cloud' + cloud] : style.hide}></View>
      </View>
    )
  }
}

export default Animation
