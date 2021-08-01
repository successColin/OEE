/*
 * @Descripttion: input框 聚焦
 * @Author: ytx
 * @Date: 2021-04-02 14:45:42
 * @LastEditors: ytx
 * @LastEditTime: 2021-04-19 14:50:35
 */

import Vue from 'vue';

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el, binding) {
    if (binding.value) {
      el.children[0].focus();
    }
  },
});
