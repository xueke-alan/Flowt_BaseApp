import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RedirectRoute } from '@/router/base';
import { PageEnum } from '@/enums/pageEnum';
import { createRouterGuards } from './guards';
import type { IModuleType } from './types';
import { slashRedirect } from './generator';
import { createMicoRoutes } from '@/router/microApp'
import { devApp } from './devRouter';
import { getMicroConfigList } from "@/api/menu";
// const userStore = useUserStore();


// 获取基座应用自带的路由，比如开发者使用的路由：路由管理，发布平台
const modules = import.meta.glob<IModuleType>('./base/**/*.ts', { eager: true });



/**
 * @description: 获取异步路由。包含三个部分，1.基座路由，2.开发模式的路由，3.服务端已部署的路由
 * @micoAppRoutersFromDB 从数据库中得到的全部的路由，包含未上线的路由
 */
export async function getAsyncRoutes(micoAppRoutersFromDB) {

  // 1.基座路由
  const baseRouter = Object.values(modules).map((m: any) => slashRedirect(m.default)).flat(2)

  // 2.开发模式的路由
  const devMicroConfig: any[] = [];
  for (const name of Object.keys(devApp)) {
    const res = await fetch(devApp[name].config);
    if (!res.ok) { throw new Error('Network response was not ok'); }
    const microConfigList = await res.json();
    console.log(microConfigList); // 打印 microConfigList
    devMicroConfig[name] = microConfigList;
  }

  // 3.服务端已部署的路由
  const microConfigList = await getMicroConfigList()

  // 生成完整的微服务路由
  const handledmicoAppRouterList = await createMicoRoutes(micoAppRoutersFromDB,
    Object.assign(microConfigList, devMicroConfig));

  // 整合全部路由
  return [...[].concat(...handledmicoAppRouterList), ...baseRouter];
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

//普通路由 无需验证权限
export const constantRouter: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
      title: 'Root',
    },
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/resetPsw',
    name: 'ResetPsw',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '重置密码',
    }
  },
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


export default router;
