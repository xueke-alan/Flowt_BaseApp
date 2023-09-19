import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RedirectRoute } from '@/router/base';
import { PageEnum } from '@/enums/pageEnum';
import { createRouterGuards } from './guards';
import type { IModuleType } from './types';
import { slashRedirect } from './generator';
import { createMicoRoutes } from '@/router/qiankun';

// const userStore = useUserStore();

// 引入全部modules路由
const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', { eager: true });

// 获取基座应用自带的路由，比如开发者使用的路由：路由管理，发布平台
const getRouteModuleList = async () => {
  const listPromise = Promise.resolve([]);
  const keys = Object.keys(modules);

  for (const key of keys) {
    const list: any = await listPromise;

    let mod: any = '';
    if (typeof modules[key].default === 'function') {
      mod = await modules[key].default();
    } else {
      mod = modules[key].default ?? {};
    }

    // 给每一个路由添加斜杠结尾的路由重定向
    slashRedirect(mod);

    const modList = Array.isArray(mod) ? [...mod] : [mod];
    list.push(...modList);
  }

  return listPromise;
};

//需要验证权限

// 引入全部qiankun路由

// 由基本路由向entry发送请求并生成完整的路由，具体实现函数见 createMicoRoutes
export async function getAsyncRoutes(micoQiankunRouters) {
  // 从后端获取以及部署的全部的路由信息
  // let res = ;
  // try {
  //   const temp = await fetch('https://api.flowt.work/mico-router/microConfigList');
  //   res = temp;
  // } catch (error) {
  //   res = [];
  // }
  // if (!res.ok) {
  //   throw new Error('Network response was not ok');
  // }
  // const { result: microConfigList } = await res.json();
  const microConfigList = {}
  console.log(microConfigList);

  // 这里还需要加入或者更改正在开发的子应用
  const devMicroConfig: any[] = [];
  const devApp = {
    quote: 'http://localhost:5173/quote/qiankun.config.json',
  };

  for (const name of Object.keys(devApp)) {
    const res = await fetch(devApp[name]);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const microConfigList = await res.json();
    console.log(microConfigList); // 打印 microConfigList
    devMicroConfig[name] = microConfigList;
  }

  const handledQiankunRouterList = await createMicoRoutes(micoQiankunRouters, {
    ...microConfigList,
    ...devMicroConfig,
  });
  const routeModuleList = await getRouteModuleList();
  console.log(routeModuleList);

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
