<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
// TODO keepLive
// BUG 两个路由同一个组件不会触发 transition
import router from '@/router';
console.log(router.currentRoute.value.meta.title);


</script>

<style lang="less" scoped>
// 淡出淡入
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
