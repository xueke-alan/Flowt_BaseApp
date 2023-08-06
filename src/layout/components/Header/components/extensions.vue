<template>
  <div class="rightIcon">
    <extensionItems :list="extensionItemsList" />

    <n-popover trigger="click" placement="bottom" style="width: 200px">
      <template #trigger>
        <n-icon size="22">
          <component :is="PuzzlePiece24Regular" />
        </n-icon>
      </template>
      <template #header>
        <div> 扩展 </div>
      </template>
      <div>ChatGPT </div>
      <template #footer>
        管理扩展
      </template>
    </n-popover>

  </div>
</template>

<script lang="ts" setup>
import { PuzzlePiece24Regular } from '@vicons/fluent'
import extensionItems from "./extensionItems.vue";

const extensionItemsList = []

</script>

<style lang="less" scoped></style>