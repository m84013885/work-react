import preload from './preload'
import create from './create'
import update from './update'

const Game = () => {
  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'app',
    // 物理引擎
    physics: {
      default: 'arcade',
      arcade: {
        // 重力设置
        gravity: { y: 100 },
        debug: false
      }},
    // 场景
    scene: {
      // 预加载
      preload,
      // 记载主要场景
      create,
      // 时时刷新场景
      update
    }
  }
  const game = new Phaser.Game(config)
}

export default Game
