module.exports = {
  publicPath: '/VueCLII/',
  devServer: {
    sockHost: 'http://localhost:8080/', // 配置开发环境地址
    disableHostCheck: true,
    public: 'http://localhost:8080/',
    proxy: {
      '/api': {
        target: 'http://cotton.hzau.edu.cn:80/web',
        ws: true, // 允许跨域
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
