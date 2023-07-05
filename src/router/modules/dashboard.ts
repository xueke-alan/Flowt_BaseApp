import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import {  Gauge24Regular } from '@vicons/fluent';
import { renderIcon } from '@/utils/index';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 * */

const routeName = 'dashboard';
const group = 'main';

const routes: Array<RouteRecordRaw> = [
  {
    path: `/${routeName}`,
    name: routeName,
    redirect: `/${routeName}/console`,
    component: Layout,
    meta: {
      title: '总览面板',
      icon: renderIcon(Gauge24Regular),
      permissions: ['dashboard_console', 'dashboard_console', 'dashboard_workplace'],
      sort: 0,
      group,
    },
    children: [
      {
        path: 'console',
        name: `${routeName}_console`,
        meta: {
          title: '主控台',
          permissions: ['dashboard_console'],
          icon: renderIcon(Gauge24Regular),

          affix: true,
          group,
        },
        component: () => import('@/views/dashboard/console/console.vue'),
      },
    ],
  },
];

export default routes;
