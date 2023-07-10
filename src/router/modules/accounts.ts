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

const routeName = 'account';
const group = '实验室管理';

const codeChildren = [
  {
    path: 'user',
    name: 'account-user',
    meta: {
      title: '用户管理',
      icon: renderIcon(PersonEdit24Regular),
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
    path: 'home',
    name: 'Home',
    meta: {
      title: '权限管理',
      default: true,
      icon: renderIcon(ProtocolHandler24Regular),
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
    redirect: `/${routeName}/user`,
    component: Layout,
    meta: {
      title: '账号管理',
      icon: renderIcon(PeopleSettings24Regular),
      isQiankunRouter: {
        name: 'sub-app-code',
        entry: '//localhost:8085',
        container: '#main-view-qiankun',
        activeRule: getActiveRule(`/${routeName}`),
      },
      sort: 1,
      group,
      noKeepAlive: false,
    },
    children: [...test],
  },
];

export default routes;
