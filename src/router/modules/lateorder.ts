import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';

import qiankunBox from '@/views/qiankun/index.vue';


import {
  TextBulletListSquareEdit20Regular,
  TextBulletListSquare24Regular,
  TaskListSquareAdd24Regular,
} from '@vicons/fluent';

const codeChildren = [
  {
    path: 'all',
    name: 'lateorder-all',
    meta: {
      title: '迟单填写',
      default: true,
      icon: renderIcon(TextBulletListSquareEdit20Regular),
    },
  },
  {
    path: 'calibration',
    name: 'lateorder-calibration',
    meta: {
      title: '迟单管理',
      icon: renderIcon(TaskListSquareAdd24Regular),
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
    path: '/lateorder',
    name: 'lateorder',
    // redirect: '/code2/home',
    component: Layout,
    meta: {
      title: '迟单管理',
      icon: renderIcon(TextBulletListSquare24Regular),
      sort: 5,
      group:'测试',
      noKeepAlive: false,
    },
    children: [...test],
  },
];

export default routes;
