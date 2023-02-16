const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:9000/',//要代理的本地api地址，也可以换成线上测试地址
        changeOrigin: true,//允许跨域
        pathRewrite: { "^/api": "/api" }//将/api开头替换为/api
      }
    }
  },
  publicPath: './'
})
