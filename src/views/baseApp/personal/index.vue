<template>
  <n-layout position="absolute" style="height: 100%; padding: 10px 0;" has-sider>

    <n-layout-sider :width="200" :native-scrollbar="false" bordered>
      <n-menu :indent="20" :options="menuOptions" @update:value="handleUpdateValue" v-model:value="MenuVal" />
    </n-layout-sider>

    <n-layout content-style="padding: 24px;" :native-scrollbar="false">
      <!-- <transition name="fade" mode="out-in">
        <security v-if="MenuVal == 'security'" /> -->
      <micoApp :meta="{ name: 'personal', entry: 'http://localhost:5173/personal' }" />
      <!-- </transition> -->
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
    key: 'security',
    icon: renderIcon(TabInprivateAccount24Regular)
  },
  {
    key: 'divider-1',
    type: 'divider',
  },
  {
    label: '个人信息',
    key: 'info',
    icon: renderIcon(ShieldKeyhole24Regular)
  },
  {
    label: '设备',
    key: 'equip',
    icon: renderIcon(ShieldKeyhole24Regular)
  },
  {
    label: 'Rewards',
    key: 'Rewards',
    icon: renderIcon(Reward24Regular)
  },
]

const MenuVal = ref('security')
import { useRouter } from 'vue-router';
const router = useRouter();
const message = useMessage()
const handleUpdateValue = (key: string, item: MenuOption) => {
  console.log(key);
  console.log(item);

  console.log(router);

  router.push({
    name: 'personal_other',
    params: { pra: key }


  })
}
</script>