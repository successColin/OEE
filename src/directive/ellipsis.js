/*
 * @Author: chenmingkuan
 * @Date: 2018-11-29 15:55:55
 * @Desc: 多行省略号指令
 * @Last Modified by: chenmingkuan
 * @Last Modified time: 2018-11-29 15:56:24
 */
import Vue from 'vue';

Vue.directive('ellipsis', {
  bind(el) {
    setTimeout(() => {
      if (el.offsetHeight > 36) {
        el.classList.add('sl');
      } else {
        el.classList.remove('sl');
      }
    }, 0);
  },
});
