<template>
  <div class="rightIcon">
    <n-tooltip placement="bottom">
      <template #trigger>
        <n-tag :bordered="false" style="padding:0 8px;border-radius: 5px">
          <template #avatar>
            <n-button text>
              <n-icon size="20">
                <component :is="Reward24Regular" />
              </n-icon>
            </n-button>
          </template>
          <span style="font-size: 13px;margin-right: 3px;margin-top: 0.125em;">210</span>
        </n-tag>


      </template>
      <span>奖励</span>
    </n-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { Reward24Regular } from '@vicons/fluent'



</script>

<style lang="less" scoped></style>