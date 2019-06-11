const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const childProcess = require('child_process')
const IP = require('./IP')
const app = express()
const config = require('./webpack.config')
const compiler = webpack(config)
const proxy = require('http-proxy-middleware')

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true, chunks: false },
  progress: true,
  inline: true,
  hot: true
}))
if (proxy) {
  // myProxy.url
  const apiProxy = proxy({
    target: 'http://test1.app-remix.com',
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    logLevel: 'debug'
  })
  app.use(`/v1/*`, apiProxy)
}
app.use(WebpackHotMiddleware(compiler))
// Serve the files on port 3000.
app.listen(3001, function () {
  childProcess.exec(`open http://${IP}:3001/index`)
})
