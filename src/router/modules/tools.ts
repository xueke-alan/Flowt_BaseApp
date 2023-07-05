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
  Calculator24Regular,
  TextBulletListSquareEdit24Regular,
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
function getActiveRule(routerPrefix: string) {
  return (location: { pathname: string }) => location.pathname.startsWith(routerPrefix);
}
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
  {
    path: '/tools/',
    name: 'tools/',
    redirect: '/tools/home',
    meta: {
      hidden: true,
    },
  },
];

export default routes;
