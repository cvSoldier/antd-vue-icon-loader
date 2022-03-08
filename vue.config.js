const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('antd-vue-icon-loader')
        .loader('antd-vue-icon-loader')
        .tap(options => {
          return {
            ...options,
            filePath: './src/icon.js'
          }
        })
        .end()
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@ant-design/icons/lib/dist$': '@/icon.js',
      },
    },
    resolveLoader: {
      modules: [path.join(__dirname, './loader'), 'node_modules']
    },
  }
}
