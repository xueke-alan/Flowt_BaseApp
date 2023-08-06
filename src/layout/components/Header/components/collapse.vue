<template>
  <div class="ml-4 mr-1" style="display: flex;">
    <n-icon size="24" v-if="collapsed">
      <component :is="PanelRightContract24Regular" />

    </n-icon>
    <n-icon size="24" v-else>
      <component :is="PanelLeftContract24Regular" />

    </n-icon>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { PanelRightContract24Regular, PanelLeftContract24Regular } from '@vicons/fluent'

// 使用 defineProps 来接收 prop
const { collapsed } = defineProps(['collapsed']);
</script>

<style lang="less" scoped></style>