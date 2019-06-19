const marginLeft = (window.innerWidth - 327)

const Create = function () {
  const bg = this.add.image(288 / 2 + marginLeft, 327 / 2, 'bg').setScale(0.5)
  // bg.setInteractive()
  // console.log(bg)
  // bg.on('clicked', test, this)
  //   this.platforms = this.physics.add.staticGroup()
  //   this.platforms.create(400, 568, 'fu').setScale(0.5)
  // const test1 = this.physics.add.sprite(100, 450, 'fu')
  // console.log(test1)

  // const stars = this.physics.add.group({
  //   key: 'fu',
  //   setXY: { x: 50, y: -100 }
  // })

  // console.log(stars)
  // stars.children.entries[0].setInteractive()
  // stars.children.entries[0].on('clicked', test, this)

  this.input.on('gameobjectup', function (pointer, gameObject) {
    gameObject.emit('clicked', gameObject)
  }, this)

  setInterval(() => {
    createFu(this)
  }, 5000)
}
const createFu = function (that) {
  const fu = that.physics.add.sprite(100, 450, 'fu')
  fu.setInteractive()
  fu.on('clicked', test, that)
}
function test () {
  console.log(1)
}

export default Create
