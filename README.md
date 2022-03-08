# antd-vue-icon-loader
使用前后
![前](./READMEAssets/before.png)
![后](./READMEAssets/after.png)
## 使用
```js
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
    }
  }
}

```