import { toRaw } from 'vue';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { store } from '@/store';
import { constantRouter } from '@/router/index';


export interface IAsyncRouteState {
  menus: RouteRecordRaw[];
  micoRouterListOri: any[];
  sortedGroupList: any[];
  routers: any[];
  routersAdded: any[];
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
    setRouters(routers: RouteRecordRaw[]) {
      this.routersAdded = routers;
      this.menus = routers;
      this.routers = constantRouter.concat(routers);
      this.isDynamicRouteAdded = true
    },
  },
});

// Need to be used outside the setup
export function useAsyncRoute() {
  return useAsyncRouteStore(store);
}
