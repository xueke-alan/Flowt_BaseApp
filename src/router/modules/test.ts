import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';
import { getActiveRule } from '@/router/qiankun';
import qiankunBox from '@/views/qiankun/index.vue';

import {
  WindowWrench24Filled,
  DoorTag24Regular,
  ShareScreenPersonOverlayInside24Regular,
  DocumentTextLink24Regular,
} from '@vicons/fluent';
const codeChildren = [
  {
    path: 'all',
    name: 'test-all',
    meta: {
      title: '全部测试',
      icon: renderIcon(DoorTag24Regular),
    },
  },
  {
    path: 'my',
    name: 'test-my',
    meta: {
      title: '我的测试',
      icon: renderIcon(ShareScreenPersonOverlayInside24Regular),
    },
  },
  {
    path: 'file',
    name: 'test-file',
    meta: {
      title: '培训资料',
      icon: renderIcon(DocumentTextLink24Regular),
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
    path: '/code2',
    name: 'code2',
    redirect: '/code2/home',
    component: Layout,
    meta: {
      title: '测试相关',
      icon: renderIcon(WindowWrench24Filled),
      isQiankunRouter: {
        name: 'sub-app-code2',
        entry: '//localhost:8086',
        container: '#main-view-qiankun',
        activeRule: getActiveRule('/code2'),
      },
      sort: 3,
      group: '测试',
      noKeepAlive: false,
    },
    children: [...test],
  },
];

export default routes;
