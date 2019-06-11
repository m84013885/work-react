'use strict'
import style from './style.css'

class Circle extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    percent: PropTypes.number,
    lineWidth: PropTypes.number,
    step: PropTypes.number,
    lineColor: PropTypes.string,
    lineInColor: PropTypes.string,
    lineIn: PropTypes.bool
  }
  static defaultProps = {
    percent: 50,
    lineWidth: 4,
    lineColor: '#ddd',
    lineInColor: '#fff',
    step: 1,
    lineIn: true
  }
  componentDidMount () {
    const { percent, lineWidth, lineColor, lineInColor, step, lineIn } = this.props
    this.arc(percent, lineWidth, lineColor, lineInColor, step, lineIn)
  }
  arc (number, lineWidth, lineColor, lineInColor, step, lineIn) {
    const canvas = this.canvas // 获取canvas元素
    this.canvas.width = parseInt(getComputedStyle(canvas).width)
    this.canvas.height = parseInt(getComputedStyle(canvas).height)
    if (this.canvas.width !== this.canvas.height) {
      throw new Error('width and height not equal.')
    }
    const context = canvas.getContext('2d')
    const centerWidth = canvas.width / 2
    const centerInWidth = canvas.height / 2 - lineWidth
    const rad = Math.PI * 2 / 100 // 将360度分成100份，那么每一份就是rad度
    let speed = 0 // 初始化进度
    // 绘制外圈
    function blueCircle (n) {
      lineIn ? whiteCircle() : ''
      context.save()
      context.strokeStyle = lineColor // 设置描边样式
      context.lineWidth = lineWidth // 设置线宽
      context.beginPath() // 路径开始
      context.arc(centerWidth, centerWidth, centerInWidth, -Math.PI / 2, -Math.PI / 2 + n * rad, false) // 用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
      context.stroke() // 绘制
      // context.closePath() // 路径结束
      context.restore()
    }
    // 绘制内圈
    function whiteCircle () {
      context.save()
      context.beginPath()
      context.strokeStyle = lineInColor
      context.lineWidth = lineWidth + 1 // 设置线宽
      context.arc(centerWidth, centerWidth, centerInWidth, 0, Math.PI * 2, false)
      context.stroke()
      context.closePath()
      context.restore()
    }
    // 百分比文字绘制
    function text (n) {
      context.save() // save和restore可以保证样式属性只运用于该段canvas元素
      context.fillStyle = getComputedStyle(canvas).color
      context.font = getComputedStyle(canvas).font // 设置字体大小和字体
      const fontSize = parseInt(getComputedStyle(canvas).fontSize)
      let offerWidth = 1
      if (number < 10) {
        offerWidth = 2
      }
      else if (number < 100) {
        offerWidth = 1.5
      }
      // 绘制字体，并且指定位置
      context.fillText(n.toFixed(0) + '%', centerWidth - fontSize / offerWidth, centerInWidth + fontSize / 2)
      context.stroke() // 执行绘制
      context.restore()
    }
    // 动画循环
    function drawFrame () {
      context.clearRect(0, 0, canvas.width, canvas.height)
      text(speed)
      blueCircle(speed)
      if (parseInt(speed) === number) {
        return
      }
      else {
        window.requestAnimationFrame(drawFrame, canvas)
      }
      speed += step
    }
    drawFrame()
  }
  canvasDOM = this.canvasDOM.bind(this)
  canvasDOM (canvas) {
    this.canvas = canvas
  }
  render () {
    const className = this.props.className || style.canvas
    return (
      <canvas ref={this.canvasDOM} className={className}></canvas>
    )
  }
}

export default Circle
