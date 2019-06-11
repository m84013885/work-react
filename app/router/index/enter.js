'use strict'
import style from './enter.css'

import { App, View } from '../../components/src'

import Main from './main'
import Banner from './banner'
import Rule from './rule'
import RuleMask from './ruleMask'

class Enter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      rule: false
    }
  }
  componentDidMount () {

  }
  handleChangeRule = this.handleChangeRule.bind(this)
  handleChangeRule () {
    this.setState({
      rule: !this.state.rule
    })
  }
  render () {
    const rule = this.state.rule
    return (
      <App noSysScroll={false}>
        <View className={style.app}>
          <Banner/>
          <Rule handleChangeRule={this.handleChangeRule}/>
          <RuleMask handleChangeRule={this.handleChangeRule} rule={rule}/>
          <Main/>
          <View className={style.footer1}>活动与苹果公司无关</View>
          <View className={style.footer2}>活动最终解释权归本直播平台所有</View>
        </View>
      </App>
    )
  }
}

export default Enter
