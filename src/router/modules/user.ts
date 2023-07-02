import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { TableOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

import qiankunBox from '@/views/qiankun/index.vue';

import {
  PeopleSettings24Regular,
  People24Regular,
  PersonEdit24Regular,
  ProtocolHandler24Regular,
} from '@vicons/fluent';

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
function getActiveRule(routerPrefix: string) {
  return (location: { pathname: string }) => location.pathname.startsWith(routerPrefix);
}
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
      group:'实验室管理',
      noKeepAlive: false,
    },
    children: [...test],
  },
  {
    path: '/order/',
    name: 'order/',
    redirect: '/order/home',
    meta: {
      hidden: true,
    },
  },
];

export default routes;
