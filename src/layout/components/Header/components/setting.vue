<template>
  <div  @click="openSetting" class="rightIcon">
    <n-tooltip placement="bottom-end">
      <template #trigger>
        <n-icon size="22" style="font-weight: bold">

          <component :is="Settings24Regular" />

        </n-icon>
      </template>
      <span>项目配置</span>
    </n-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { Settings24Regular } from '@vicons/fluent'

import { useRouter } from 'vue-router';
const router = useRouter();


function openSetting() {
  // const { openDrawer } = drawerSetting.value;
  // openDrawer();
  router.push({ name: 'setting' });
}
</script>

<style lang="less" scoped></style>