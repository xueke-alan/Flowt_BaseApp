import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { TableOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

import qiankunBox from '@/views/qiankun/index.vue';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */

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
function getActiveRule(routerPrefix: string) {
  return (location: { pathname: string }) => location.pathname.startsWith(routerPrefix);
}
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
  {
    path: '/kanban/',
    name: 'kanban/',
    redirect: '/kanban/home',
    meta: {
      hidden: true,
    },
  },
];

export default routes;
