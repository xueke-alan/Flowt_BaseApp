import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RedirectRoute } from '@/router/base';
import { PageEnum } from '@/enums/pageEnum';
import { createRouterGuards } from './guards';
import type { IModuleType } from './types';
import { slashRedirect } from './generator';

// 引入全部modules路由
const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', { eager: true });

const routeModuleList: RouteRecordRaw[] = await (async () => {
  const listPromise = Promise.resolve([]);
  const keys = Object.keys(modules);

  for (const key of keys) {
    const list: any = await listPromise;

    console.log(modules[key].default);
    let mod: any = '';
    if (typeof modules[key].default === 'function') {
      console.log('这是一个函数');
      mod = await modules[key].default();
      console.log(mod);
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

console.log(routeModuleList);

// 引入全部qiankun路由
// TODO 这里应该有一个qiankun路由json配置文件,这个配置文件应该也是放在外部文件夹中
const qiankunRouter = [
  {
    entry: 'http:',
    title: '',
    group: '',
  },
];

// 路由排序
// TODO 路由排序是否可以在路由分组后进行，以及是否可以有更好的路由排序方案，如预先排序
function sortRoute(a, b) {
  return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0);
}

routeModuleList.sort(sortRoute);

console.log(routeModuleList);

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

//需要验证权限

export const asyncRoutes = [...routeModuleList];

//普通路由 无需验证权限
export const constantRouter: RouteRecordRaw[] = [
  LoginRoute,
  RestPswRoute,
  RootRoute,
  RedirectRoute,
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
