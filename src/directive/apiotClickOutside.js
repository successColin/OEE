/*
 * @Author: chenmingkuan
 * @Date: 2018-11-29 16:45:00
 * @Desc: 点击外部收起指令
 * @Last Modified by: cmk
 * @Last Modified time: 2021-05-24 17:51:35
 */
import Vue from 'vue';

Vue.directive('apiotClickOutside', {
  bind(el, binding) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false;
      }
      if (binding.expression) {
        binding.value(e);
      }
    }

    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('mousedown', documentHandler);
  },
  update() {},
  unbind(el) {
    document.removeEventListener('mousedown', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
});
