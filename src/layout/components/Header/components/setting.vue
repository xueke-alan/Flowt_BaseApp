<template>
  <div class="rightIcon">

    <n-button text class="spin">
      <n-icon size="22" style="font-weight: bold" @click="openSetting">
        <component :is="Settings24Regular" />
      </n-icon>
    </n-button>

    <n-drawer v-model:show="active" :width="400" :height="200" placement="right" :trap-focus="false" :block-scroll="false"
      to="#layout-content-main" style="border-top: 2px solid #aaaaaa88;">
      <n-drawer-content title="系统设置">
        <setting />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script lang="ts" setup>
import { Settings24Regular } from '@vicons/fluent'
import setting from "@/views/setting/index.vue";
import { ref } from 'vue';

// import { useRouter } from 'vue-router';
// const router = useRouter();
const active = ref(false);
// const active = false

function openSetting() {
  // const { openDrawer } = drawerSetting.value;
  // openDrawer();
  // router.push({ name: 'setting' });
  active.value = !active.value

}
</script>

<style lang="less" scoped>
.spin {
  transform: rotate(0deg);
  // transition: transform 3s linear;


  &:hover {
    transform: rotate(3600deg);
    transition: transform 40s linear;
    /* 修改过渡效果的持续时间 */
  }
}
</style>