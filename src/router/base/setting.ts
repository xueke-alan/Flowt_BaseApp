import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';

import setting from '@/views/setting/index.vue';

const routeName = 'setting';
const group = '开发者';

import { TableEdit24Regular, DocumentTable24Regular } from '@vicons/fluent';

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
      // hidden:true,
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
