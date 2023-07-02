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

import { BoxMultiple24Regular, BoxSearch24Regular, BoxArrowLeft24Regular } from '@vicons/fluent';

const codeChildren = [
  {
    path: 'all',
    name: 'sample-all',
    meta: {
      title: '样品查询',
      default: true,
      icon: renderIcon(BoxSearch24Regular),
    },
  },
  {
    path: 'calibration',
    name: 'sample-calibration',
    meta: {
      title: '退样管理',
      icon: renderIcon(BoxArrowLeft24Regular),
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
    path: '/sample',
    name: 'sample',
    // redirect: '/code2/home',
    component: Layout,
    meta: {
      title: '样品管理',
      icon: renderIcon(BoxMultiple24Regular),
      sort: 5,
      group: '测试',
      noKeepAlive: false,
    },
    children: [...test],
  },
  {
    path: '/sample/',
    name: 'sample/',
    redirect: '/sample/home',
    meta: {
      hidden: true,
    },
  },
];

export default routes;
