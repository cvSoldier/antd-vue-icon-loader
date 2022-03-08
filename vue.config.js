const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-test-loader')
        .loader('vue-test-loader')
        .end()
  },
  configureWebpack: {
    resolveLoader: {
      modules: [path.join(__dirname, './src/loaders'), 'node_modules']
    },
  }
}
