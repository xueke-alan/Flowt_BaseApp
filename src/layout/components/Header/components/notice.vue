<template>
  <div class="rightIcon">
    <n-popover trigger="click" placement="bottom-end" style="width: 320px" content-style="padding: 0">
      <template #trigger>
        <div style="display: flex">
          <n-badge dot :offset="[16, 0]" processing style="position: absolute" />
          <n-icon size="22">
            <component :is="Alert32Regular" />
          </n-icon>
        </div>
      </template>
      <template #header>
        <div> 通知 </div>
      </template>

      <div style="padding: 5px 0px 10px 0">
        <n-scrollbar style="max-height: 300px;min-height: 150px; padding: 0 ">
          <n-list hoverable clickable>
            <n-list-item v-for="i in 0" :key="i">
              <n-button text class="button">
                <span>通知标题</span>
              </n-button>

              <div class="rigth">
                <span style="color: #aaa; font-size: 12px">通知内容；通知内容；通知内容；通知内容；通知内容；通知内容；</span>
              </div>
            </n-list-item>

          </n-list>

          <div style="pointer-events: none;user-select: none;">
            <n-empty description="暂无通知" style="margin: 40px;" />
          </div>


        </n-scrollbar>
      </div>

      <template #footer>
        <div style="display: flex; align-items: center; justify-content: flex-end">
          <n-button text class="button">
            <n-icon size="20" class="mr-1">
              <component :is="CommentCheckmark20Regular" />
            </n-icon>
            <span>全部已读</span>
          </n-button>
        </div>
      </template>
    </n-popover>
  </div>
</template>

<script lang="ts" setup>
import { Alert32Regular, CommentCheckmark20Regular } from '@vicons/fluent';
</script>

<style lang="less" scoped>
.notionContent {
  margin-bottom: 10px;
  border-bottom: 1px solid #1d1d1d;
}
</style>
