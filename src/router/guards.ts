import type { RouteRecordRaw } from 'vue-router';
import { isNavigationFailure, Router } from 'vue-router';
import { useUser } from '@/store/modules/user';
import { useMainViewState } from '@/store/modules/mainView';
import { useAsyncRoute } from '@/store/modules/asyncRoute';
import { ACCESS_TOKEN } from '@/store/mutation-types';
import { storage } from '@/utils/Storage';
import { PageEnum } from '@/enums/pageEnum';
import { ErrorPageRoute } from '@/router/base';
import { getAppEnvConfig } from '@/utils/env';
import { sleep } from '@/utils';

const LOGIN_PATH = PageEnum.BASE_LOGIN;
const ResetPaw_PATH = PageEnum.BASE_ResetPaw;

const whitePathList = [LOGIN_PATH, ResetPaw_PATH]; // no redirect whitelist

export function createRouterGuards(router: Router) {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig();
  const userStore = useUser();
  const mainViewStore = useMainViewState();
  const asyncRouteStore = useAsyncRoute();

  // BUG 首屏有的时候会加载两次

  const switchMainView = async (to, from) => {
    console.log(to, from);
    if (to?.name?.toString() == from?.name?.toString()) {
      return
    }

    // p判断是不是大路由
    mainViewStore.hide = true
    console.log('已经修改了 mainViewStore.hide', mainViewStore.hide);

    await sleep(250);
    console.log('这里阻塞了2秒');
    // debugger

  }

  router.beforeEach(async (to, from, next) => {
    // TODO 找到真正有用的   await switchMainView(to, from)
    const Loading = window['$loading'] || null;
    Loading && Loading.start();
    if (from.path === LOGIN_PATH && to.name === 'errorPage') {
      next(PageEnum.BASE_HOME);
      return;
    }
    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }
    const token = storage.get(ACCESS_TOKEN);
    if (!token) {
      // You can access without permissions. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {

        next();
        return;
      }
      // redirect login page
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      await switchMainView(to, from)

      next(redirectData);
      return;
    }

    if (asyncRouteStore.getIsDynamicRouteAdded) {
      // 这里没有处理好路由重定向
      await switchMainView(to, from)
      next();
      return;
    }
    const userInfo = await userStore.getInfo();

    const routes = await asyncRouteStore.generateRoutes(userInfo);

    // 动态添加可访问路由表
    routes.forEach((item) => {
      router.addRoute(item as unknown as RouteRecordRaw);
    });
    //添加404
    const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name);
    if (isErrorPage === -1) {
      router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw);
    }

    const redirectPath = (from.query.redirect || to.path) as string;
    const redirect = decodeURIComponent(redirectPath);
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
    asyncRouteStore.setDynamicRouteAdded(true);

    // 授权成功执行以下代码
    // 存在临时路由则先删除临时路由
    const tempRoute = router.hasRoute('TempRoute');
    if (tempRoute) router.removeRoute('TempRoute');
    // 此时已添加了后端返回的动态路由，进行跳转一次
    if (tempRoute) {
      // 此处 next 里就不可用 ...to，因为 to 是临时路由
      await switchMainView(to, from)

      next({ path: to.path, query: to.query, replace: true });
    } else {
      await switchMainView(to, from)

      next(nextData);
    }


    Loading && Loading.finish();
  });

  router.afterEach(async (to, _, failure) => {
    document.title =
      VITE_GLOB_APP_SHORT_NAME + ' - ' + ((to?.meta?.title as string) || document.title);

    if (isNavigationFailure(failure)) {
    }
    const asyncRouteStore = useAsyncRoute();
    // 在这里设置需要缓存的组件名称
    const keepAliveComponents = asyncRouteStore.keepAliveComponents;
    const currentComName: any = to.matched.find((item) => item.name == to.name)?.name;

    if (currentComName && !keepAliveComponents.includes(currentComName) && to.meta?.keepAlive) {
      // 需要缓存的组件
      keepAliveComponents.push(currentComName);
      console.log('需要缓存：' + currentComName);
    } else if (!to.meta?.keepAlive || to.name == 'Redirect') {
      // 不需要缓存的组件
      console.log('不需要缓存：' + currentComName);
      const index = asyncRouteStore.keepAliveComponents.findIndex((name) => name == currentComName);
      if (index != -1) {
        keepAliveComponents.splice(index, 1);
      }
    }
    asyncRouteStore.setKeepAliveComponents(keepAliveComponents);
    const Loading = window['$loading'] || null;

    // 将mainview的class置为hide
    setTimeout(() => {
      mainViewStore.hide = false
    }, 0);
    Loading && Loading.finish();
    // 关闭首屏加载
  });

  router.onError((error) => {
    console.log(error, '路由错误');
  });
}
