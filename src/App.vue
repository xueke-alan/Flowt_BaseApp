<template>
  <div class="app">
    <NConfigProvider v-if="!isLock" :locale="zhCN" :theme="getDarkTheme" :theme-overrides="getThemeOverrides"
      :date-locale="dateZhCN">

      <AppProvider>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </AppProvider>
    </NConfigProvider>

    <transition v-if="isLock && $route.name !== 'login'" name="slide-up">
      <LockScreen />
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { zhCN, dateZhCN, darkTheme } from 'naive-ui';
import { LockScreen } from '@/components/Lockscreen';
import { AppProvider } from '@/components/Application';
import { useScreenLockStore } from '@/store/modules/screenLock.js';
import { useRoute } from 'vue-router';
import { useDesignSettingStore } from '@/store/modules/designSetting';
import { lighten } from '@/utils/index';

const route = useRoute();
const useScreenLock = useScreenLockStore();
const designStore = useDesignSettingStore();
const isLock = computed(() => useScreenLock.isLocked);
const lockTime = computed(() => useScreenLock.lockTime);

/**
 * @type import('naive-ui').GlobalThemeOverrides
 */
const getThemeOverrides = computed(() => {
  const appTheme = designStore.appTheme;
  const lightenStr = lighten(designStore.appTheme, 6);
  return {
    common: {
      primaryColor: appTheme,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr,
      primaryColorSuppl: appTheme,
    },
    LoadingBar: {
      colorLoading: appTheme,
    },
  };
});

const getDarkTheme = computed(() => (designStore.darkTheme ? darkTheme : undefined));

let timer: NodeJS.Timer;

const timekeeping = () => {
  clearInterval(timer);
  if (route.name == 'login' || isLock.value) return;
  // 设置不锁屏
  useScreenLock.setLock(false);
  // 重置锁屏时间
  useScreenLock.setLockTime();
  timer = setInterval(() => {
    // 锁屏倒计时递减
    useScreenLock.setLockTime(lockTime.value - 1);
    if (lockTime.value <= 0) {
      // 设置锁屏
      useScreenLock.setLock(true);
      return clearInterval(timer);
    }
  }, 1000);
};

onMounted(() => {
  document.addEventListener('mousedown', timekeeping);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', timekeeping);
});
</script>

<style lang="less">
@import 'styles/index.less';
</style>

<style scoped lang="less">
@keyframes show {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }

}

.app {
  animation: show .6s ease;
}
</style>

<style lang="less" scoped>
// 淡出淡入
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>