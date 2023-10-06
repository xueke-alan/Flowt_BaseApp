import { defineStore } from 'pinia';
import { store } from '@/store';

interface mainViewState {
    //加载中
    hide: boolean;
}

export const useMainViewStateStore = defineStore({
    id: 'app-mainView',
    state: (): mainViewState => ({
        hide: false,
    }),
    getters: {},
    actions: {},
});

// Need to be used outside the setup
export function useMainViewState() {
    return useMainViewStateStore(store);
}
