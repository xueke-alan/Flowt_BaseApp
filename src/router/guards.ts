import type { RouteRecordRaw } from 'vue-router';
import { isNavigationFailure, Router } from 'vue-router';
import { useUser } from '@/store/modules/user';
import { useMainViewState } from '@/store/modules/mainView';
import { useAsyncRoute } from '@/store/modules/asyncRoute';
import { ACCESS_TOKEN } from '@/store/mutation-types';
import { getAsyncRoutes } from '@/router/index';
import { storage } from '@/utils/Storage';
import { PageEnum } from '@/enums/pageEnum';
import { ErrorPageRoute } from '@/router/base';
import { getAppEnvConfig } from '@/utils/env';
import { sleep } from '@/utils';
import { redirectDataType } from './types';
import { getMicoRouterList } from '@/api/menu';
import { nextTick, toRaw } from 'vue';


const LOGIN_PATH = PageEnum.BASE_LOGIN;
const ResetPaw_PATH = PageEnum.BASE_ResetPaw;

const whitePathList = [LOGIN_PATH, ResetPaw_PATH]; // no redirect whitelist

export function createRouterGuards(router: Router) {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppEnvConfig();
  const userStore = useUser();
  const mainViewStore = useMainViewState();

  const asyncRouteStore = useAsyncRoute();


  // TODO 这里的路由基本搞定了 首屏有的时候会加载两次的BUG已解决，现在是 await sleep(250);不够优雅。想想新方案
  // TODO 加载页面算是一个SGS的Logo，如果可以续上SGSlogo并且渐变到画面就更好了。50%
  const switchMainView = async (to, from) => {
    if (to?.name?.toString() !== from?.name?.toString()) {
      // mainViewStore.hide = true
      // await sleep(250);
    }
  }

  router.beforeEach(async (to, from, next) => {
    // TODO 找到真正有用的   await switchMainView(to, from)
    console.log(to);

    const Loading = window['$loading'] || null;


    // 如果要前往
    if (from.path === LOGIN_PATH && to.name === 'errorPage') {
      next(PageEnum.BASE_HOME);
      return;
    }

    // 白名单
    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }

    // 如果没有token，说明未登录
    const token = storage.get(ACCESS_TOKEN);
    if (!token) {

      // 如果是不需要权限的页面，则可以直接登录
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      // 将要前往的页面保存在redirect中，前往登陆页面，登陆成功后自动跳转
      const redirectData: redirectDataType = {
        path: LOGIN_PATH,
        replace: true,
        query: to.path ? { redirect: to.path } : undefined
      };

      next(redirectData);
      return;
    }

    // 动态路由是否添加成功？
    // BUG 似乎是这里导致首屏加载2次
    if (asyncRouteStore.getIsDynamicRouteAdded) {
      // 这里没有处理好路由重定向
      await switchMainView(to, from)
      console.log('添加过动态路由了');
      // console.log(router.getRoutes());
      // console.log(router.hasRoute("fileLibrary"));


      next();
      return;
    } else {
      console.log('还没有添加动态路由，现在开始添加动态路由');
      Loading && Loading.start();


      const userInfo = await userStore.getInfo();


      let accessedRouters: RouteRecordRaw[] = [];
      const permissionsList = userInfo.permissions ?? [];

      try {
        //过滤账户是否拥有某一个权限，并将菜单从加载列表移除
        // 从数据库中拿到全部的路由信息，只包含子应用的根路由，子应用的子路由由子应用维护
        const { micoRouterListOri, sortedGroupList } = await getMicoRouterList({
          role: userStore.getUserInfo.role,
        });
        asyncRouteStore.micoRouterListOri = micoRouterListOri;
        asyncRouteStore.sortedGroupList = sortedGroupList;
        // 通过 getAsyncRoutes 将原始的路由信息补全
        accessedRouters = await getAsyncRoutes(micoRouterListOri);
      } catch (error) {
        console.log(error);
      }

      asyncRouteStore.setRouters(accessedRouters);

      // 动态添加可访问路由表
      accessedRouters.forEach((item) => {
        router.addRoute(item as unknown as RouteRecordRaw);
      });


      //添加404
      const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name);
      if (isErrorPage === -1) {
        console.log('没有找到ErrorPageRoute');

        router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw);
      } else {
        console.log('找到ErrorPageRoute了');

      }

      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      // console.log(
      //   { redirectPath, redirect, nextData }
      // );



      // 存在临时路由则先删除临时路由
      // 此时已添加了后端返回的动态路由，进行跳转一次
      // console.log(toRaw(accessedRouters));

      if (router.hasRoute('TempRoute')) {
        console.log('有临时路由');

        router.removeRoute('TempRoute');
        // 此处 next 里就不可用 ...to，因为 to 是临时路由
        next({ path: to.path, query: to.query, replace: true });
      }
      Loading && Loading.finish();
    }
  });

  router.afterEach(async (to) => {
    document.title = `${VITE_GLOB_APP_SHORT_NAME} - ${to?.meta?.title || document.title}`

    // 将mainview的class置为hide
    // nextTick(() => { mainViewStore.hide = false });

  });

  router.onError((error) => {
    console.log(error, '路由错误');
  });
}
