/*
 * @Author: cmk
 * @Date: 2021-04-16 17:54:03
 * @LastEditors: cmk
 * @LastEditTime: 2021-04-17 09:54:00
 * @Des: 一些公共配置
 */
module.exports = {
  themeColor: '#4689F5', // 这个色号必须和主题色是一个颜色才行，要不然出来的css模板文件是空的,element-ui的默认主题色是#409EFF
  selectColorArr: [
    '#5A80ED',
    '#EE5E5E',
    '#FAB71C',
    '#FC8256',
    '#34C7BE',
    '#10B98A',
    '#1CA6FF',
    '#A853F2',
    '#EF4373',
    '#708DB7',
  ],
  whitePathName: [
    'demo',
  ],
  baseUrl: '', // 全局设置地址包括打包后静态文件地址、路由地址。默认空特殊项目需要添加
  PREFIX: '/api', // 前缀
  VERSION: 'v1', // 版本号，默认为1，后续有其他接口版本号是其他值
};
