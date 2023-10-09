import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';

import setting from '@/views/setting/index.vue';

const routeName = 'routers';
const group = '开发者';

import { TableEdit24Regular, DocumentTable24Regular } from '@vicons/fluent';

const routes: Array<RouteRecordRaw> = [
  {
    path: `/${routeName}`,
    name: routeName,
    redirect: '/routers/home',
    component: Layout,
    meta: {
      title: '应用管理',
      icon: renderIcon(DocumentTable24Regular),
      sort: 5,
      // hidden:true,
      group,
    },

    children: [
      {
        path: 'home',
        name: `${routeName}_`,
        component: setting,
        meta: {
          title: '应用管理',
          default: true,
          icon: renderIcon(TableEdit24Regular),
          group,
        },
      },
    ],
  },
];

export default routes;
