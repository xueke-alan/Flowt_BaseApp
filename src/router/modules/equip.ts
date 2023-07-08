import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';

import qiankunBox from '@/views/qiankun/index.vue';

const routeName = 'equip';
const group = '测试';
import {
  Building24Regular,
  CalendarLtr24Regular,
  TapDouble24Regular,
  Connector24Regular,
} from '@vicons/fluent';

const codeChildren = [
  {
    path: 'all',
    name: 'equip-all',
    meta: {
      title: '全部设备',
      default: true,
      icon: renderIcon(Building24Regular),
    },
  },
  {
    path: 'calibration',
    name: 'equip-calibration',
    meta: {
      title: '设备校准',
      icon: renderIcon(TapDouble24Regular),
    },
  },
  {
    path: 'schedule',
    name: 'equip-schedule',
    meta: {
      title: '设备排期',
      icon: renderIcon(CalendarLtr24Regular),
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
    path: `/${routeName}`,
    name: routeName,
    redirect: `/${routeName}/all`,
    component: Layout,
    meta: {
      title: '设备管理',
      icon: renderIcon(Connector24Regular),
      sort: 2,
      group,
      noKeepAlive: false,
    },
    children: [...test],
  },
];

export default routes;
