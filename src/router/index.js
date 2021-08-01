import Vue from 'vue';
import VueRouter from 'vue-router';
import { baseUrl } from '../config';
import routes from './Routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  base: baseUrl,
  mode: 'history',
});

// router.beforeEach((to, from, next) => {
//   // 登录注册等页面，主题色不变
//   if (to.meta.notChangeTheme) {
//     changeThemeColor(themeColor, false);
//   } else {
//     initThemeColor();
//   }
//   const pathName = to.meta.parentPath ? to.meta.parentPath : to.name;
//   // console.log(store.state.base.allRouteName);
//   // 不在白名单跟权限页面的地址去404
//   if (
//     store.state.base.allRouteName.includes(pathName) ||
//     whitePathName.includes(pathName)
//   ) {
//     next();
//   } else {
//     next('/404');
//   }
//   // next();
// });

// // 解决报错
// const originalPush = VueRouter.prototype.push;
// const originalReplace = VueRouter.prototype.replace;
// // push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) {
//     return originalPush.call(this, location, onResolve, onReject);
//   }
//   return originalPush.call(this, location).catch((err) => err);
// };
// // replace
// VueRouter.prototype.replace = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) {
//     return originalReplace.call(this, location, onResolve, onReject);
//   }
//   return originalReplace.call(this, location).catch((err) => err);
// };

export default router;
