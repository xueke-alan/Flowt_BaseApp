<template>
  <div class="rightIcon">
    <n-tooltip placement="bottom">
      <template #trigger>
        <n-icon size="22">
          <component :is="TooltipQuote24Regular" />

        </n-icon>
      </template>
      <span>提示</span>
    </n-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { TooltipQuote24Regular } from '@vicons/fluent'

</script>

<style lang="less" scoped>
.rightIcon {
  padding-top: 2px;
  margin-right: 3px !important;
}
</style>