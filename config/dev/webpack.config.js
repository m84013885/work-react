const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { routers } = require('../config.json')
const webpackConfig = {
  entry: {
    // index:[`../../app/router/index/index.js`,`webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000`]
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({ __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV || 'true')) }),
    new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin({
    //     template: path.resolve(__dirname, '../../app/router/index/index.html')
    // })
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDom: 'react-dom',
      PropTypes: 'prop-types'
    })
  ],
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(m?js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /(swiper)/,
        use: [
          'style-loader',
          'css-loader?modules&localIdentName=_[local]_[hash:base64:5]',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: { path: path.resolve(__dirname, 'postcss.config.js') }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: /(swiper)/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              config: { path: path.resolve(__dirname, 'postcss.config.js') }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  mode: 'development' // 设置mode
}

routers.map((item) => {
  const {
    name,
    template
  } = item
  const tempSrc = path.resolve(__dirname, `../../app/router/${template}/index.html`)
  const plugin = new HtmlWebpackPlugin({
    filename: `${template}`,
    title: name,
    template: tempSrc,
    inject: true,
    chunks: [template]
  })
  webpackConfig.entry[template] = [`./app/router/${template}/index.js`, `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000`]
  webpackConfig.plugins.push(plugin)
})
module.exports = webpackConfig
