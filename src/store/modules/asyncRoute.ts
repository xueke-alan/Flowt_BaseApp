import { toRaw } from 'vue';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { store } from '@/store';
import { constantRouter, getAsyncRoutes } from '@/router/index';
import { getMicoRouterList } from '@/api/system/menu';
import { useUserStore } from '@/store/modules/user';

export interface IAsyncRouteState {
  menus: RouteRecordRaw[];
  micoRouterListOri: any[];
  sortedGroupList: any[];
  routers: any[];
  routersAdded: any[];
  keepAliveComponents: string[];
  isDynamicRouteAdded: boolean;
}

export const useAsyncRouteStore = defineStore({
  id: 'app-async-route',
  state: (): IAsyncRouteState => ({
    menus: [],
    micoRouterListOri: [],
    sortedGroupList: [],
    routers: constantRouter,
    routersAdded: [],
    keepAliveComponents: [],
    // Whether the route has been dynamically added
    isDynamicRouteAdded: false,
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return this.menus;
    },
    getIsDynamicRouteAdded(): boolean {
      return this.isDynamicRouteAdded;
    },
  },
  actions: {
    getRouters() {
      return toRaw(this.routersAdded);
    },
    setDynamicRouteAdded(added: boolean) {
      this.isDynamicRouteAdded = added;
    },
    // 设置动态路由
    setRouters(routers: RouteRecordRaw[]) {
      this.routersAdded = routers;
      this.routers = constantRouter.concat(routers);
    },
    setMenus(menus: RouteRecordRaw[]) {
      // 设置动态路由
      this.menus = menus;
    },
    setMicoRouterListOri(micoRouterListOri: any[]) {
      // 设置动态路由
      this.micoRouterListOri = micoRouterListOri;
    },
    setSortedGroupList(sortedGroupList: any[]) {
      // 设置动态路由
      this.sortedGroupList = sortedGroupList;
    },
    setKeepAliveComponents(compNames: string[]) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames;
    },
    async generateRoutes(data) {
      let accessedRouters: RouteRecordRaw[] = [];
      const permissionsList = data.permissions ?? [];
      const userStore = useUserStore();
      try {
        //过滤账户是否拥有某一个权限，并将菜单从加载列表移除
        const { micoRouterListOri, sortedGroupList } = await getMicoRouterList({
          role: userStore.getUserInfo.role,
        });
        this.setMicoRouterListOri(micoRouterListOri);
        this.setSortedGroupList(sortedGroupList);
        accessedRouters = await getAsyncRoutes(micoRouterListOri);
      } catch (error) {
        console.log(error);
      }

      this.setRouters(accessedRouters);
      this.setMenus(accessedRouters);
      return toRaw(accessedRouters);
    },
  },
});

// Need to be used outside the setup
export function useAsyncRoute() {
  return useAsyncRouteStore(store);
}
