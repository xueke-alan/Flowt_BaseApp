<template>
  <div class="rightIcon">
    <n-tooltip placement="bottom">
      <template #trigger>
        <div style="width: auto;
    display: flex;
    align-items: center;background-color: #eee;height: 26px;padding:0 10px;border-radius: 5px;">
          <n-icon size="18" class="mr-1">
            <component :is="Reward20Regular" />
          </n-icon>
          <span style="font-size: 12px;margin-right: 3px;font-weight: 600;">123</span>
        </div>

      </template>
      <span>奖励</span>
    </n-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { Reward20Regular } from '@vicons/fluent'



</script>

<style lang="less" scoped></style>