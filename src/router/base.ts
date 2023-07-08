import { ErrorPage, RedirectName, Layout } from '@/router/constant';
import { RouteRecordRaw } from 'vue-router';
import { renderIcon } from '@/utils/index';

import {
  ErrorCircle24Regular
} from '@vicons/fluent';
// 404 on a page
export const ErrorPageRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: Layout,
  meta: {
    title: '页面错误',
    hideBreadcrumb: true,
    hideNav: true,
    icon: renderIcon(ErrorCircle24Regular),

  },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPageSon',
      component: ErrorPage,
      meta: {
        title: '页面错误',
        hideBreadcrumb: false,
        hideNav: true,
      icon: renderIcon(ErrorCircle24Regular),

      },
    },
  ],
};

export const RedirectRoute: RouteRecordRaw = {
  path: '/redirect',
  name: RedirectName,
  component: Layout,
  meta: {
    title: RedirectName,
    hideBreadcrumb: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: RedirectName,
      component: () => import('@/views/redirect/index.vue'),
      meta: {
        title: RedirectName,
        hideBreadcrumb: true,
      },
    },
  ],
};
