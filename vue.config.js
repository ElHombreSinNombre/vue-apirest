const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  runtimeCompiler: true,
  publicPath: process.env.NODE_ENV === 'production' ?
    '/vue-apirest' :
    '/'
})
