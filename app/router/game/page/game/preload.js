import bg from '../../../../images/game/bg.png'
import fu from '../../../../images/game/fu.png'

const Preload = function () {
  // 加载背景图片
  this.load.image('bg', bg)
  this.load.image('fu', fu)
//   this.load.image('bomb', 'image/bomb.png')
//   this.load.image('ground', 'image/platform.png')
//   this.load.image('star', 'image/star.png')
//   this.load.spritesheet('dude', 'image/dude.png', { frameWidth: 32, frameHeight: 48 })
}
export default Preload
