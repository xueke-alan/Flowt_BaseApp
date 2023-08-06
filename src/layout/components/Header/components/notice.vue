<template>
  <div class="rightIcon">
    <n-tooltip placement="bottom">
      <template #trigger>
        <div style="display: flex;">
          <n-badge dot :offset="[16, 0]" processing style="position: absolute;" />
          <n-icon size="22">
            <component :is="Alert32Regular" />
          </n-icon>
        </div>
      </template>
      <span>提醒</span>
    </n-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { Alert32Regular } from '@vicons/fluent'

</script>

<style lang="less" scoped></style>