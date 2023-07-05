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

import { WindowWrench24Filled,DoorTag24Regular,ShareScreenPersonOverlayInside24Regular,DocumentTextLink24Regular } from '@vicons/fluent';
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
function getActiveRule(routerPrefix: string) {
  return (location: { pathname: string }) => location.pathname.startsWith(routerPrefix);
}
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
  {
    path: '/code2/',
    name: 'code2/',
    redirect: '/code2/home',
    meta: {
      hidden: true,
    },
  },
];

export default routes;
