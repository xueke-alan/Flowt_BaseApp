import { defineStore } from 'pinia';
import { store } from '@/store';
import designSetting from '@/settings/designSetting';
import { lighten } from '@/utils';

const { darkTheme, appTheme, appThemeList } = designSetting;

interface DesignSettingState {
  //深色主题
  darkTheme: boolean;
  //系统风格
  appTheme: string;
  //系统内置风格
  appThemeList: string[];
}

export const useDesignSettingStore = defineStore({
  id: 'app-design-setting',
  state: (): DesignSettingState => ({
    darkTheme,
    appTheme,
    appThemeList,
  }),
  getters: {
    getDarkTheme(): boolean {
      return this.darkTheme;
    },
    getAppTheme(): string {
      return this.appTheme;
    },
    getAppThemeList(): string[] {
      return this.appThemeList;
    },
    getThemeOverrides(): any {
      // const appTheme = this.appTheme;
      const lightenStr = lighten(this.appTheme, 6);
      return {
        common: {
          primaryColor: this.appTheme,
          primaryColorHover: lightenStr,
          primaryColorPressed: lightenStr,
          primaryColorSuppl: appTheme,
        },
        LoadingBar: {
          colorLoading: appTheme,
        },
      };
    }
  },
  actions: {},
});

// Need to be used outside the setup
export function useDesignSetting() {
  return useDesignSettingStore(store);
}
