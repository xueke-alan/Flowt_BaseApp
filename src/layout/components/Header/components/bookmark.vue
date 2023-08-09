<template>
  <div class="rightIcon">
    <n-popover trigger="click" placement="bottom-end" style="width: 320px" content-style="padding: 0">
      <template #trigger>
        <div style="display: flex">
          <!-- <n-badge dot :offset="[16, 0]" style="position: absolute" /> -->
          <n-icon size="22">
            <component :is="BookmarkMultiple24Regular" />
          </n-icon>
        </div>
      </template>
      <template #header>
        <div style="font-size: 14px;font-weight: bold;margin-left: 5px;">收藏栏</div>
      </template>

      <!-- TODO 重写内容，文件折叠模式，底部是添加文件夹，添加收藏，顶部是搜索，筛选  -->
      <div style="padding: 5px 0px 10px 0">
        <n-scrollbar style="max-height: 300px;min-height: 150px; padding: 0 ">
          <n-list hoverable clickable>
            <n-list-item v-for="i in 15" :key="i">
              <n-button text class="button">
                <span>书签标题</span>
              </n-button>

              <div class="rigth">
                <span style="color: #aaa; font-size: 12px">书签副标题：吧吧啦吧啦吧吧啦吧啦</span>
              </div>
            </n-list-item>

          </n-list>




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
import { BookmarkMultiple24Regular, CommentCheckmark20Regular } from '@vicons/fluent';
</script>

<style lang="less" scoped>
.notionContent {
  margin-bottom: 10px;
  border-bottom: 1px solid #1d1d1d;
}
</style>
