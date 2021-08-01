// /*
//  * @Author: cmk
//  * @Date: 2021-04-07 08:47:38
//  * @LastEditors: cmk
//  * @LastEditTime: 2021-04-19 16:54:24
//  * @Des:
//  */
// import { menuCenter, menuCenterFav } from '@/api/menuManage';
// import bus from '@/utils/bus';
// // import router from '@/router';

// export default {
//   state: {
//     allRouteName: ['home'], // 所有路由的名字,默认路由名字home必须包含
//     clientModuleArr: ['menu'], // 用户自定义模块的名字
//     routeArr: [], // 异步获取的路由
//     curModuleId: -1, // 当前模块id
//     curMenuId: -1, // 当前菜单id
//   },
//   getters: {
//     getRouteArr(state) {
//       return state.routeArr;
//     },
//   },
//   mutations: {
//     changeRouteArr(state, arr) {
//       state.routeArr = arr;
//       const recentlyTabArr =
//         JSON.parse(sessionStorage.getItem('recentlyTabArr')) || [];
//       const navTabArr = JSON.parse(sessionStorage.getItem('navTabArr')) || [];

//       const recentlyTabArrNew = [];
//       const navTabNew = [];

//       arr.forEach((item) => {
//         item.children.forEach((val) => {
//           const recentlyTab = recentlyTabArr.find((obj) => obj.id === val.id);
//           const navTab = navTabArr.find((obj) => obj.id === val.id);
//           if (recentlyTab) {
//             recentlyTabArrNew.push(val);
//           }
//           if (navTab) {
//             navTabNew.push(val);
//           }
//         });
//       });
//       sessionStorage.setItem(
//         'recentlyTabArr',
//         JSON.stringify(recentlyTabArrNew)
//       );
//       sessionStorage.setItem('navTabArr', JSON.stringify(navTabNew));
//       bus.$emit('routerReset');
//     },
//     // 更改当前路由id
//     changeCurMenuId(state, id) {
//       state.curMenuId = id;
//     },
//   },
//   actions: {
//     //   获取服务器的路由
//     async getRoute({ commit, state }) {
//       const params = {
//         keywords: '',
//         menuClientType: 'PC',
//       };
//       try {
//         state.allRouteName = ['home'];
//         const data = await menuCenter(params);
//         // const arr = [];
//         data.forEach((module) => {
//           module.children.forEach((menu) => {
//             if (!menu.routeName || /^MENU/.test(menu.routeName)) {
//               menu.path = `/menu/${menu.id}?title=${menu.menuName}`;
//               menu.routeName = 'menu';
//             } else {
//               menu.path = `/${menu.routeName}`;
//             }
//             if (!state.allRouteName.includes(menu.routeName)) {
//               // arr.push(...tmepRoute);
//               state.allRouteName.push(menu.routeName);
//             }
//           });
//         });
//         commit('changeRouteArr', data);
//       } catch (error) {
//         console.log(error);
//         // router.push('/login');
//       }
//     },
//     // eslint-disable-next-line
//     async getFavRoute({ state }, params) {
//       try {
//         const data = await menuCenterFav(params);
//         data.forEach((menu) => {
//           menu.isCollect = true;
//           if (menu.parentId !== 0) {
//             if (!menu.routeName || /^MENU/.test(menu.routeName)) {
//               menu.path = `/menu/${menu.id}?title=${menu.menuName}`;
//             } else {
//               menu.path = `/${menu.routeName}`;
//             }
//           }
//         });
//         // console.log(state);
//         return Promise.resolve(data);
//       } catch (error) {
//         return Promise.reject(error);
//       }
//     },
//   },
// };
