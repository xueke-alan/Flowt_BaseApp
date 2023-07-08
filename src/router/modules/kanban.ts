import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';

import qiankunBox from '@/views/qiankun/index.vue';


import {
  TaskListSquareLtr24Regular,
  TextBulletListTree24Filled,
  AlignTop24Regular,
} from '@vicons/fluent';

const codeChildren = [
  {
    path: 'all',
    name: 'kanban-all',
    meta: {
      title: '订单看板',
      default: true,
      icon: renderIcon(TaskListSquareLtr24Regular),
    },
  },
  {
    path: 'calibration',
    name: 'kanban-calibration',
    meta: {
      title: '测试看板',
      icon: renderIcon(TextBulletListTree24Filled),
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
    path: '/kanban',
    name: 'kanban',
    // redirect: '/code2/home',
    component: Layout,
    meta: {
      title: '任务看板',
      icon: renderIcon(AlignTop24Regular),
      sort: 1.5,
      group: '测试',
      noKeepAlive: false,
    },
    children: [...test],
  },
];

export default routes;
