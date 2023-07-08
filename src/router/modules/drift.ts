import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';

import qiankunBox from '@/views/qiankun/index.vue';

const routeName = 'drift';
const group = '测试';

import {
  TableEdit24Regular,
  DocumentTable24Regular,
  TableFreezeColumn24Regular,
} from '@vicons/fluent';

const codeChildren = [
  {
    path: 'edit',
    name: `${routeName}_edit`,
    meta: {
      title: '草稿编辑',
      default: true,
      icon: renderIcon(TableEdit24Regular),
    },
  },
  {
    path: 'template',
    name: `${routeName}_template`,
    meta: {
      title: '草稿模板',
      icon: renderIcon(TableFreezeColumn24Regular),
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
    // redirect: '/code2/home',
    component: Layout,
    meta: {
      title: '草稿编辑',
      icon: renderIcon(DocumentTable24Regular),
      sort: 5,
      noKeepAlive: false,
      group,
    },
    children: [...test],
  },
];

export default routes;
