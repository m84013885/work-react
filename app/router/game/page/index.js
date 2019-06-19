'use strict'
import style from './index.css'

import Animation from './animation'
import { closeView } from '../../../utils/goto'

import { App, View } from '../../../components'

class Index extends React.Component {
  state = {

  }
  componentDidMount () {

  }
  _renderAnimation () {
    const content = []
    for (let i = 0; i < 6; i++) {
      content.push(<Animation key={i}/>)
    }
    return (
      content
    )
  }
  // delay
  _renderAnimationTime () {
    const content = []
    for (let i = 0; i < 19; i++) {
      content.push(<Animation delay={i * 0.5} key={i}/>)
    }
    return (
      content
    )
  }
  close () {
    closeView()
  }
  render () {
    return (
      <App noSysScroll={false}>
        <View id="app" className={style.app}>
          <View className={style.close} tap={this.close}>&times;</View>
          {this._renderAnimation()}
          {this._renderAnimationTime()}
          {/* <Animation /> */}
        </View>
      </App>
    )
  }
}

export default Index
