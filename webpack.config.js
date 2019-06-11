let webpackConfig
module.exports = env => {
  webpackConfig = require('./config/dep')
  return webpackConfig
}
