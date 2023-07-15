import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';

import qiankunBox from '@/views/qiankun/index.vue';


import { BoxMultiple24Regular, BoxSearch24Regular, BoxArrowLeft24Regular } from '@vicons/fluent';

const codeChildren = [
  {
    path: 'all',
    name: 'sample-all',
    meta: {
      title: '样品查询',
      default: true,
      icon: renderIcon(BoxSearch24Regular),
    },
  },
  {
    path: 'calibration',
    name: 'sample-calibration',
    meta: {
      title: '退样管理',
      icon: renderIcon(BoxArrowLeft24Regular),
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
    path: '/sample',
    name: 'sample',
    // redirect: '/code2/home',
    component: Layout,
    meta: {
      title: '样品管理',
      icon: renderIcon(BoxMultiple24Regular),
      sort: 5,
      group: '测试',
      noKeepAlive: false,
    },
    children: [...test],
  },
];

export default routes;
