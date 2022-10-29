const AutoImport = require('unplugin-auto-import/webpack') //插件按需加载对应样式文件
const Components = require('unplugin-vue-components/webpack') //插件按需加载
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
}
