import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';

import qiankunBox from '@/views/qiankun/index.vue';


import { MailArrowForward20Regular, ChatArrowBack20Regular, Bot24Regular } from '@vicons/fluent';

const codeChildren = [
  {
    path: 'all',
    name: 'robot-all',
    meta: {
      title: '微信机器人',
      default: true,
      icon: renderIcon(ChatArrowBack20Regular),
    },
  },
  {
    path: 'calibration',
    name: 'robot-calibration',
    meta: {
      title: '邮件机器人',
      icon: renderIcon(MailArrowForward20Regular),
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
    path: '/robot',
    name: 'robot',
    // redirect: '/code2/home',
    component: Layout,
    meta: {
      title: '机器人',
      icon: renderIcon(Bot24Regular),
      sort: 0,
      group: '实验室管理',
      noKeepAlive: false,
    },
    children: [...test],
  },
];

export default routes;
