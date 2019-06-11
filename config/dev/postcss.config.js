const autoprefixer = require('autoprefixer')
const adaptive = require('postcss-adaptive-rpx')
module.exports = {
  plugins: [
    autoprefixer({ overrideBrowserslist: ['last 2 versions'] }),
    adaptive({ remUnit: 75 })
  ]
}
