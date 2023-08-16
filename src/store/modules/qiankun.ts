import { defineStore } from 'pinia';
import { store } from '@/store';

interface DesignSettingState {
  //加载中
  loading: boolean;
}

export const useQiankunBusStore = defineStore({
  id: 'app-qiankun-bus',
  state: (): DesignSettingState => ({
    loading: true,
  }),
  getters: {},
  actions: {},
});

// Need to be used outside the setup
export function useQiankunBus() {
  return useQiankunBusStore(store);
}
