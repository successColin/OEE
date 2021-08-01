/*
 * @Descripttion:
 * @version:
 * @Author: tjf
 * @Date: 2021-04-20 15:51:39
 * @LastEditors: tjf
 * @LastEditTime: 2021-05-24 09:31:41
 */
import Vue from 'vue';
import Vuex from 'vuex';
import PersistedState from 'vuex-persistedstate';
// import base from './base/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    // base,
  },
  plugins: [
    PersistedState({
      storage: window.sessionStorage,
      // reducer(v) {
      //   return {
      //     userCenter: v.userCenter,
      //     globalConfig: v.globalConfig,
      //   };
      // },
    }),
  ],
});
