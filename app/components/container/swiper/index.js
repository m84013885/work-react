import ThirdSwiper from './swiper'
import View from '../view'
import  './swiper.min.css'
class Swiper extends React.Component {
  static propTypes = {
    // list: PropTypes.array.isRequired, // 播放列表
    autoplay: PropTypes.bool, // 是否自动切换
    interval: PropTypes.number, // 自动切换的时间间隔，单位ms
    loop: PropTypes.bool, // 会在原本slide前后复制若干个slide(默认一个)并在合适的时候切换，让Swiper看起来是循环的。
    vertical: PropTypes.bool, // 滑动方向是否为纵向
    speed: PropTypes.number, // 切换速度，即slider自动滑动开始到结束的时间（单位ms），也是触摸滑动时释放至贴合的时间。
    current: PropTypes.number, // 设定初始化时slide的索引。
    showIndicatorDots: PropTypes.bool, // 是否显示面板指示点
    indicatorClass: PropTypes.string, // 指示点样式
    indicatorActiveClass: PropTypes.string, // 选中指示点样式
    onTap: PropTypes.func, // 点击事件
    onSlideChange: PropTypes.func, // 当当前Slide切换时执行(activeIndex发生改变)
    getSwiper: PropTypes.func // 获取当前swiper实例
  }
  static defaultProps = {
    className: 'swiper-container',
    autoplay: false,
    interval: 3000,
    loop: false,
    vertical: false,
    speed: 300,
    current: 0,
    showIndicatorDots: false,
    indicatorClass: 'swiper-pagination-bullet',
    indicatorActiveClass: 'swiper-pagination-bullet-active',
    onTap: null,
    onSlideChange: null,
    getSwiper: null
  }
  _renderSwiper () {
    const {
      className,
      current,
      autoplay,
      loop,
      interval,
      vertical,
      speed,
      showIndicatorDots,
      indicatorClass,
      indicatorActiveClass,
      onTap,
      onSlideChange
    } = this.props
    const param = {
      initialSlide: current,
      autoplay: autoplay ? {
        delay: interval,
        disableOnInteraction: false
      } : false,
      pagination: showIndicatorDots ? {
        el: '.swiper-pagination',
        type: 'bullets',
        bulletClass: indicatorClass,
        bulletActiveClass: indicatorActiveClass
      } : false,
      loop,
      vertical,
      speed,
      on: {
        tap () {
          onTap && onTap(this)
        },
        slideChange () {
          onSlideChange && onSlideChange(this)
        }
      }
    }
    if (this.swiper) { this.swiper.update() }
    else {
      this.swiper = new ThirdSwiper(`.${className}`, param)
    }
  }
  componentDidMount () {
    const { getSwiper } = this.props
    this._renderSwiper()
    getSwiper && getSwiper(this.swiper)
  }
  componentDidUpdate () { this._renderSwiper() }
  componentWidllUnmount () { this.swiper.destroy() }
  render () {
    const { className, children } = this.props
    return (
      <View className={`swiper-container ${className}`}>
        <View className='swiper-wrapper'>
          {children}
        </View>
        <div className="swiper-pagination"></div>
      </View>
    )
  }
}
export default Swiper
