import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';

import qiankunBox from '@/views/qiankun/index.vue';


import {
  Communication24Filled
} from '@vicons/fluent';

const codeChildren = [
  {
    path: 'all',
    name: 'local-all',
    meta: {
      title: '本地服务',
      default: true,
      icon: renderIcon(Communication24Filled),
    },
  },
];

const test: Array<RouteRecordRaw> = [];

codeChildren.forEach((c) => {
  test.push({
    ...c,
    component: qiankunBox,
  });
});

const routes: Array<RouteRecordRaw> = [
  {
    path: '/local',
    name: 'local',
    // redirect: '/code2/home',
    component: Layout,
    meta: {
      title: '本地服务',
      icon: renderIcon(Communication24Filled),
      sort: 1,
      noKeepAlive: false,
    },
    children: [...test],
  },
];

export default routes;
