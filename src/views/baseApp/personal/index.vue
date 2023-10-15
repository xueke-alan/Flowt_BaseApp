<template>
  <n-layout position="absolute" style="height: 100%; padding: 10px 0;" has-sider>

    <n-layout-sider :width="200" :native-scrollbar="false" bordered>
      <n-menu :indent="20" :options="menuOptions" @update:value="handleUpdateValue" v-model:value="MenuVal" />
    </n-layout-sider>

    <n-layout content-style="padding: 24px;" :native-scrollbar="false">
      <security />
      <!-- <micoApp /> -->
    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>

import { h, Component, ref } from 'vue'
import micoApp from "@/views/micoApp/index.vue";
import { NIcon, useMessage } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import security from "./security.vue";
import { Reward24Regular, ShieldKeyhole24Regular, TabInprivateAccount24Regular } from "@vicons/fluent";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: '账号安全',
    key: 'go-back-home',
    icon: renderIcon(TabInprivateAccount24Regular)

  },
  {
    key: 'divider-1',
    type: 'divider',
  },
  {
    label: '个人信息',
    key: 'pinball-1973',
    icon: renderIcon(ShieldKeyhole24Regular)
  },
  {
    label: 'Rewards',
    key: 'a-wild-sheep-chase',
    icon: renderIcon(Reward24Regular)
  },
]

const MenuVal = ref('go-back-home')

const message = useMessage()
const handleUpdateValue = (key: string, item: MenuOption) => {

}
</script>