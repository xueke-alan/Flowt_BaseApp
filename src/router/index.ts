import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RedirectRoute } from '@/router/base';
import { PageEnum } from '@/enums/pageEnum';
import { createRouterGuards } from './guards';
import type { IModuleType } from './types';
import { slashRedirect } from './generator';
import { createMicoRoutes } from '@/router/qiankun';

import { useUserStore } from '@/store/modules/user';

// const userStore = useUserStore();

// 引入全部modules路由
const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', { eager: true });

const routeModuleList: RouteRecordRaw[] = await (async () => {
  const listPromise = Promise.resolve([]);
  const keys = Object.keys(modules);

  for (const key of keys) {
    const list: any = await listPromise;

    let mod: any = '';
    if (typeof modules[key].default === 'function') {
      console.log('这是一个函数');
      mod = await modules[key].default();
    } else {
      console.log('这不是一个函数');
      mod = modules[key].default ?? {};
    }

    // 给每一个路由添加斜杠结尾的路由重定向
    slashRedirect(mod);

    const modList = Array.isArray(mod) ? [...mod] : [mod];
    list.push(...modList);
  }

  return listPromise;
})();
// const routeModuleList: RouteRecordRaw[] = [];
//需要验证权限

// 引入全部qiankun路由

// 由基本路由向entry发送请求并生成完整的路由，具体实现函数见 createMicoRoutes
export async function getAsyncRoutes(micoQiankunRouters) {
  const userStore = useUserStore();
  console.log(userStore.getUserInfo.role);



  console.log(micoQiankunRouters);

  const handledQiankunRouterList = await createMicoRoutes(micoQiankunRouters);
  return [...[].concat(...handledQiankunRouterList), ...routeModuleList];
}

// 根路由
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

// 登录路由
export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
  },
};

// 重置密码路由
export const RestPswRoute: RouteRecordRaw = {
  path: '/resetPsw',
  name: 'ResetPsw',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '重置密码',
  },
};

// tempRoute
export const tempRoute: RouteRecordRaw = {
  path: '/:catchAll(.*)',
  name: 'tempRoute',
  component: () => import('@/layout/components/Empty/index.vue'),
  meta: {
    title: 'tempRoute',
    hidden: true,
  },
};

// const { name } = router.currentRoute.value;
// if (!name) {
//   router.addRoute({
//     path: window.location.pathname,
//     name: 'TempRoute',
//     component: () => import('@/components/layouts/emptyLayout.vue'),
//   });
// }

//普通路由 无需验证权限
export const constantRouter: RouteRecordRaw[] = [
  LoginRoute,
  RestPswRoute,
  RootRoute,
  RedirectRoute,
  {
    path: window.location.pathname,
    name: 'TempRoute',
    component: () => import('@/components/Empty/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// })

export default router;
