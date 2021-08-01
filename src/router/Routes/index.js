export default [
  {
    path: '/demo',
    name: 'demo',
    component: () => import('_v/Demo'),
    meta: {
      notChangeTheme: true,
    },
  },
  {
    path: '*', // 匹配所有路由
    redirect: '/404',
  },
];
