<template>
  <div class="rightIcon">
    <n-tooltip placement="bottom">
      <template #trigger>
        <n-icon size="20">
          <component :is="ExpandUpRight24Regular" @click="toggleFullScreen" />
        </n-icon>
      </template>
      <span>全屏</span>
    </n-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { ExpandUpRight24Regular } from '@vicons/fluent'



// 全屏切换
const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
</script>

<style lang="less" scoped></style>