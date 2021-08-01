/*
 * @Author: cmk
 * @Date: 2021-04-19 10:53:52
 * @LastEditors: ytx
 * @LastEditTime: 2021-04-21 10:03:47
 * @Des: 禁止特殊字符
 */
import Vue from 'vue';

Vue.directive('forbid', {
  inserted(el, binding) {
    const targetEl = el.getElementsByTagName('input')[0];
    function special(e) {
      e.target.value = e.target.value.replace(
        /[`~#$%^&*+=<>?:"{}|,\\/;\\[\]·~#￥%……&*——+={}|《》？：“”【】、；‘，。、]/g,
        ''
      );
      targetEl.dispatchEvent(new Event('input'));
    }
    if (binding.value) {
      el.__special__ = special;
      if (targetEl) targetEl.addEventListener('keyup', special);
    }
  },
  unbind(el) {
    const targetEl = el.getElementsByTagName('input')[0];
    if (targetEl) targetEl.removeEventListener('keyup', el.__special__);
    delete el.__special__;
  },
});
