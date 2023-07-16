import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';

import setting from '@/views/setting/index.vue';

const routeName = 'setting';
const group = 'main';

import { TableEdit24Regular, DocumentTable24Regular } from '@vicons/fluent';

// const codeChildren = [
//   {
//     path: '',
//     name: `${routeName}_`,
//     meta: {
//       title: '系统设置',
//       default: true,
//       icon: renderIcon(TableEdit24Regular),
//     },
//   },
// ];

// const test: Array<RouteRecordRaw> = [];

// codeChildren.forEach((c) => {
//   test.push({
//     ...c,
//     component: setting,
//   });
// });

const routes: Array<RouteRecordRaw> = [
  {
    path: `/${routeName}`,
    name: routeName,
    redirect: '/setting/home',
    component: Layout,
    meta: {
      title: '系统设置',
      icon: renderIcon(DocumentTable24Regular),
      sort: 5,
      noKeepAlive: false,
      hidden:true,
      group,
    },

    children: [
      {
        path: 'home',
        name: `${routeName}_`,
        component: setting,
        meta: {
          title: '系统设置',
          default: true,
          icon: renderIcon(TableEdit24Regular),
        },
      },
    ],
  },
];

export default routes;
