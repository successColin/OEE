/*
 * @Author: chenmingkuan
 * @Date: 2018-11-29 16:45:00
 * @Desc: 省略号
 * @Last Modified by: cmk
 * @Last Modified time: 2021-06-28 16:59:58
 */
import Vue from 'vue';

Vue.directive('showEllipsis', {
  bind(el, binding) {
    const maxlength = binding.expression ? binding.value : 8;
    const curText = el.innerText.trim();
    if (curText.length > maxlength) {
      const text = curText.slice(0, maxlength);
      el.innerText = `${text}...`;
    }
  },
});
