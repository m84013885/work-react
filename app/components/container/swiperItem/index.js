import View from '../view'

class SwiperItem extends React.Component {
  render () {
    return (
      <View className="swiper-slide">
        {this.props.children}
      </View >
    )
  }
}
export default SwiperItem
