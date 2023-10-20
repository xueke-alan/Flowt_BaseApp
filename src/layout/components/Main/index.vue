<template>
  <router-view v-slot="{ Component, route }">

    <transition name="fade" mode="out-in">
      <component :is="Component" :key="route.matched[0].name" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
// TODO keepLive
// BUG 两个路由同一个组件不会触发 transition,这个可能不算bug，应为在开发完毕后，不存在两个相同的路由组件，
// BUG 上述描述错误，同一个404组件会有不同的404详细信息，还是需要做key标签的，但是这个标签不能设置为path,现在设置为了route.matched[0].name，未完全验证是否1在各个
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
