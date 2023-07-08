import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';

import qiankunBox from '@/views/qiankun/index.vue';


import {
  Calculator24Regular,
  BowlChopsticks24Regular,
  AlignTop24Regular,
} from '@vicons/fluent';

const codeChildren = [
  {
    path: 'test',
    name: 'tools-test',
    meta: {
      title: '测试',
      default: true,
      icon: renderIcon(Calculator24Regular),
    },
  },{
    path: 'ad',
    name: 'tools-ad',
    meta: {
      title: '行政',
      default: true,
      icon: renderIcon(Calculator24Regular),
    },
  },
  {
    path: 'all',
    name: 'tools-all',
    meta: {
      title: '计算器',
      default: true,
      icon: renderIcon(Calculator24Regular),
    },
  },
  {
    path: 'calibration',
    name: 'tools-calibration',
    meta: {
      title: '每日午餐',
      icon: renderIcon(BowlChopsticks24Regular),
    },
  },
  {
    path: 'cal',
    name: 'tools-cal',
    meta: {
      title: '单位换算',
      icon: renderIcon(BowlChopsticks24Regular),
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
    path: '/tools',
    name: 'tools',
    // redirect: '/code2/home',
    component: Layout,
    meta: {
      title: '小工具',
      icon: renderIcon(AlignTop24Regular),
      sort: 2,
      noKeepAlive: false,
    },
    children: [...test],
  },
];

export default routes;
