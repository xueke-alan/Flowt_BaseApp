<template>
  <div class="layout-header" :class="{ 'high-z-index': openSetting }">

    <!--左侧菜单-->
    <div class="layout-header-left">
      <!-- 菜单收起 -->
      <collapse :collapsed="collapsed" @click="() => $emit('update:collapsed', !collapsed)" />
      <!-- 分割 -->
      <divider />
      <!-- 面包屑 -->
      <breadcrumb />
    </div>

    <!-- 搜索框 -->
    <searchBar />

    <!-- 右侧菜单 -->
    <div class="layout-header-right">
      <!-- 扩展列表 -->
      <extensions />
      <!-- 提示按钮 -->
      <tooltip />
      <!--切换全屏-->
      <fullScreen />
      <!-- 分割线 -->
      <divider />

      <!--提醒-->
      <notice />
      <!-- 收藏 -->
      <bookmark />

      <!-- 个人中心 -->
      <personal />
      <!-- 奖励 -->
      <!-- <reward /> -->
      <!-- 分割线 -->
      <divider />
      <!--设置-->
      <setting />

    </div>
  </div>
  <!--项目配置-->
  <!-- <ProjectSetting ref="drawerSetting" /> -->
</template>

<script lang="ts" setup>
import personal from "./components/personal.vue";
import breadcrumb from "./components/breadcrumb.vue";
import divider from "./components/divider.vue";
import collapse from "./components/collapse.vue";
import searchBar from "./components/searchBar.vue";
import extensions from "./components/extensions.vue";
import setting from "./components/setting.vue";
import notice from "./components/notice.vue";
import fullScreen from "./components/fullScreen.vue";
import tooltip from "./components/tooltip.vue";
import bookmark from "./components/bookmark.vue";

import { defineProps } from 'vue';
const { collapsed } = defineProps(['collapsed']);

const openSetting = true

</script>
<!-- TODO 响应式 -->
<style lang="less" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: 50px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  // transition: all 0.2s ease-in-out;
  width: 100%;
  z-index: 11;

  &.high-z-index {
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

  }

  &-left {
    display: flex;
    align-items: center;
  }

  &-right {
    display: flex;
    align-items: center;
    margin-right: 10px;

    .rightIcon {
      margin: 0 6px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }

    // .extensionIcon {
    //   margin: 0 8px;
    //   display: flex;
    // }
  }
}
</style>
