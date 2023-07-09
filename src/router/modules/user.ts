import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { getActiveRule } from '@/router/qiankun';

import { renderIcon } from '@/utils/index';

import qiankunBox from '@/views/qiankun/index.vue';

import {
  PeopleSettings24Regular,
  People24Regular,
  PersonEdit24Regular,
  ProtocolHandler24Regular,
} from '@vicons/fluent';

const codeChildren = [
  {
    path: 'home',
    name: 'Home',
    meta: {
      title: '权限管理',
      default: true,
      icon: renderIcon(ProtocolHandler24Regular),
    },
  },
  {
    path: 'about',
    name: 'About',
    meta: {
      title: '角色管理',
      icon: renderIcon(People24Regular),
    },
  },
  {
    path: 'about2',
    name: 'userM',
    meta: {
      title: '用户管理',
      icon: renderIcon(PersonEdit24Regular),
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
    path: '/order',
    name: 'order',
    redirect: '/order/home',
    component: Layout,
    meta: {
      title: '账号管理',
      icon: renderIcon(PeopleSettings24Regular),
      isQiankunRouter: {
        name: 'sub-app-code',
        entry: '//localhost:8085',
        container: '#main-view-qiankun',
        activeRule: getActiveRule('/order'),
      },
      sort: 1,
      group: '实验室管理',
      noKeepAlive: false,
    },
    children: [...test],
  },
];

export default routes;
