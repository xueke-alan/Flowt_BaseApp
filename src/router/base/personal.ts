import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';

import setting from '@/views/baseApp/personal/index.vue';

const routeName = 'personal';
import micoAppBox from '@/views/micoApp/index.vue';


import { TableEdit24Regular, DocumentTable24Regular } from '@vicons/fluent';

const routes: Array<RouteRecordRaw> = [
  {
    path: `/${routeName}`,
    name: `${routeName}`,
    redirect: `/${routeName}/security`,
    component: Layout,
    meta: {
      title: '个人中心',
      icon: renderIcon(DocumentTable24Regular),
      sort: 5,
      hidden: true,

    },

    children: [
      {
        path: 'security',
        name: `${routeName}_security`,
        component: setting,
        meta: {
          title: '账号安全',
          default: true,
          icon: renderIcon(TableEdit24Regular),
          breadcrumb: false

        },
      },
      {
        // 这里的 path 加上 '/:pra(.*)?' 后缀表示往后的'任意'参数都匹配，最后的 '?' 表示没有参数也匹配
        path: `/${routeName}/:pra(.*)?`,
        name: `${routeName}_other`,
        component: setting,

        meta: {
          title: '其他',
          breadcrumb: false,
          isMicoAppRouter: {
            name: '其他',
            entry: `https://microapp.flowt.work/${routeName}`
          },
        },
      },
    ],
  },
];

export default routes;

