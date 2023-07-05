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
function getActiveRule(routerPrefix: string) {
  return (location: { pathname: string }) => location.pathname.startsWith(routerPrefix);
}
const routes: Array<RouteRecordRaw> = [
  {
    path: '/equip',
    name: 'equip',
    // redirect: '/code2/home',
    component: Layout,
    meta: {
      title: '设备管理',
      icon: renderIcon(Connector24Regular),
      sort: 2,
      group:'测试',

      noKeepAlive: false,
    },
    children: [...test],
  },
  {
    path: '/equip/',
    name: 'equip/',
    redirect: '/equip/home',
    meta: {
      hidden: true,
    },
  },
];

export default routes;
