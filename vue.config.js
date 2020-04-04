module.exports = {
  publicPath: '/VueCLII/',
  devServer: {
    sockHost: 'http://localhost:8080/', // 配置开发环境地址
    disableHostCheck: true,
    proxy: 'http://localhost:1081/',
    public: 'http://localhost:8080/'
  }
}
