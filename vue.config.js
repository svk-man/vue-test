const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/dist/'
    : '/',
  configureWebpack: {
    module: {
      rules: [
         {
            test: /\.pug$/,
            oneOf: [
               {
                  resourceQuery: /^\?vue/,
                  use: ['pug-plain-loader']
               },
               {
                  use: ['raw-loader', 'pug-plain-loader']
               }
            ]
         }
      ]
    }
  }
});
