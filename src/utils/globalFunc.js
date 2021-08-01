import Vue from 'vue';
import bus from './bus';

Vue.prototype.$dispatch = function (eventName, data) {
  let { $parent } = this;
  while ($parent) {
    $parent.$emit(eventName, data);
    $parent = $parent.$parent;
  }
};

Vue.prototype.$broadcast = function (eventName, data) {
  function broadcast() {
    this.$children.forEach((child) => {
      if (child[eventName]) {
        child[eventName](data);
      }
      // child.$emit(eventName, data);
      if (child.$children) {
        broadcast.call(child);
      }
    });
  }
  broadcast.call(this);
};

Vue.prototype.$bus = bus;
