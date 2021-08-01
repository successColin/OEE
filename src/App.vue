<!--
 * @Author: cmk
 * @Date: 2021-04-15 18:30:38
 * @LastEditors: cmk
 * @LastEditTime: 2021-04-17 17:45:20
 * @Des: 主入口
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { whitePathName } from '@/config/index.js';

export default {
  created() {
    const pathArr = window.location.pathname.split('/');
    const pathName = pathArr[pathArr.length - 1];
    if (!whitePathName.includes(pathName)) {
      this.$store.dispatch('getRoute');
    }
  }
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
