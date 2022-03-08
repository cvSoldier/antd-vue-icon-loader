const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-test-loader')
        .loader('vue-test-loader')
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
        '@ant-design/icons/lib/dist$': '@/icons.js',
      },
    },
    resolveLoader: {
      modules: [path.join(__dirname, './src/loaders'), 'node_modules']
    },
  }
}
