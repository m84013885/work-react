'use strict'
import style from '../../css.css'
import CopyItem from './copy'
class Copy extends React.Component {
  ref = React.createRef()
  componentDidMount () {
    window.Qapp.copy = new CopyItem(this.ref.current)
  }
  render () {
    return (
      <div ref={this.ref} className={style.copy}></div>
    )
  }
}

export default Copy
