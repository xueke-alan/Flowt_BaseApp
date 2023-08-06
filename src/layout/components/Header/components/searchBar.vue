<template>
  <n-popover trigger="manual" :show="showPopover" placement="bottom-end" style="width: 300px;">
    <template #trigger>
      <n-input-group style="justify-content: flex-end;" class="mr-3">
        <n-input round size="small" :style="{ maxWidth: searchBarWidth }" class="searchBar" placeholder="Search"
          :on-focus="focusSearch" :on-blur="blurSearch">
          <template #prefix>
            <n-icon size="18" style="pointer-events: none;">
              <component :is="Flash20Regular" />
            </n-icon>
          </template>
        </n-input>
      </n-input-group>
    </template>
    <span>I wish they all could be California girls</span>
    <span>I wish they all could be California girls</span>
    <span>I wish they all could be California girls</span>
    <span>I wish they all could be California girls</span>
    <span>I wish they all could be California girls</span>
    <span>I wish they all could be California girls</span>
    <span>I wish they all could be California girls</span>
    <span>I wish they all could be California girls</span>
    <span>I wish they all could be California girls</span>
    <span>I wish they all could be California girls</span>
    <span>I wish they all could be California girls</span>
  </n-popover>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Flash20Regular } from '@vicons/fluent'
const searchBarWidth = ref('200px');
const showPopover = ref(false);
let showPopoverTimer: any
const focusSearch = () => {
  searchBarWidth.value = '300px';
  showPopoverTimer = setTimeout(() => {
    showPopover.value = true
  }, 100);
};
const blurSearch = () => {
  searchBarWidth.value = '200px';
  showPopover.value = false
  clearTimeout(showPopoverTimer)

};
</script>

<style lang="less" scoped>
.searchBar {
  transition: all .3s var(--n-bezier);
}
</style>