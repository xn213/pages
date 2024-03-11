/*
 * @Author: 贺永胜
 * @Date: 2022-05-22 14:21:10
 * @公众号: 百里青山
 * @LastEditors: 贺永胜
 * @LastEditTime: 2022-05-30 01:59:19
 * @Descripttion: 
 */
const {
  defineConfig
} = require('@vue/cli-service')


let cdn = {
  css: [],
  js: []
};
// 通过环境变量 来区分是否使用cdn
const isDev = process.env.NODE_ENV === 'development'; // 判断是否是开发环境
let externals = {};
if (!isDev) {
  // 如果是非开发环境 就排除打包 否则不排除
  externals = {
      // key(包名) / value(这个值 是 需要在CDN中获取js, 相当于 获取的js中 的该包的全局的对象的名字)
      'vue': 'Vue', // 后面的名字不能随便起 应该是 js中的全局对象名
      'axios': 'axios'
    },
    cdn = {
      js: [
        'https://cdn.bootcss.com/vue/2.6.14/vue.min.js', // vuejs
        'https://cdn.bootcss.com/axios/0.27.2/axios.min.js'
      ] // 放置js文件目录
    }
}
module.exports = defineConfig({
  publicPath: "./", //打包后部署在一个子路径上http:xxx/m/
  transpileDependencies: true,
  configureWebpack: {
		// 排除打包的某些选项
		externals: externals
	},
    chainWebpack: config => {
		//  注入cdn的变量到index.html中
		config.plugin('html').tap((arg) => {
			arg[0].cdn = cdn
			return arg
		})  
	},
})