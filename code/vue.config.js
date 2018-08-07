module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    // 设置开发接口代理
    proxy: {
      '/api': {
        target: 'http://192.168.6.181:8080',
        ws: true,
        changeOrigin: false
      }
    },
    disableHostCheck: true
  },
  productionSourceMap: false
}
