// 所有的postcss的插件都是一个函数
const pxToRem = require('postcss-pxtorem')
module.exports = {
  //插件
  plugins: [
        pxToRem({
            // 根节点大小，一般组件都是375视口
            rootValue: ({ file }) => /vant/.test(file) ? 37.5: 75,
      propList: ['*']//所有属性都转成rem
    })
  ]
}
