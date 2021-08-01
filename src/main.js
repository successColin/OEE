// 全局指令注册
import '@/directive';
// 全局组件注册
import '@/globalComponents/index';
// 全局方法注册
import '@/utils/globalFunc';
import ElementUI, { Message } from 'element-ui';
import Vue from 'vue';
// 元素尺寸变化 监听
import resize from 'vue-element-resize-detector';
import waterfall from 'vue-waterfall2';
import App from './App.vue';
import './assets/css/elementTheme.scss';
// import i18n from './i18n';
import router from './router';
import store from './store';

Vue.use(waterfall);
Vue.use(resize);
Vue.config.productionTip = false;
// Vue.component(Button.name, Button);
Vue.use(ElementUI);
Vue.prototype.$message = Message;
// 生产环境去除vue 警告
if (process.env.NODE_ENV !== 'development') {
  Vue.config.silent = true;
}

const vue = new Vue({
  // i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

window.vue = vue;
// ElementLocale.i18n((key, value) => i18n.t(key, value));
