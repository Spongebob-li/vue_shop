module.exports = {
  lintOnSave: false,  // 关闭 eslint 规范的意思
  configureWebpack: {
    resolve: {
      // 别名配置
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views':'@/views',
        'network':'@/network'
      }
    }
  }
}
