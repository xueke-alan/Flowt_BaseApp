import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';
import personal from '@/views/baseApp/personal/index.vue';
const routeName = 'personal';

import { PersonNote24Regular } from '@vicons/fluent';

const routes: Array<RouteRecordRaw> = [
  {
    path: `/${routeName}`,
    name: `${routeName}`,
    redirect: `/${routeName}/security`,
    component: Layout,
    meta: {
      title: '个人中心',
      icon: renderIcon(PersonNote24Regular),
      hidden: true,
      isMicoAppRouter: {
        name: '其他',
        entry: `http://localhost:5173/${routeName}`
      },
    },
    children: [
      {
        path: `/${routeName}/:pra(.*)?`,
        name: `${routeName}_other`,
        component: personal,
        meta: {
          title: '其他',
          breadcrumb: false,
          isMicoAppRouter: {
            name: '其他',
            entry: `http://localhost:5173/${routeName}`

          },
        },
      },
    ],
  },
];

export default routes;

