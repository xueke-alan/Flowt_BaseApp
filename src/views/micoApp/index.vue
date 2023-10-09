<template>
  <WujieVue width="100%" height="100%" :sync="false" :name="meta.name" :url="meta.entry" :loading="loadingEl" :exec="true"
    :alive="true" :props="{ currentRoutePath: router.currentRoute.value.fullPath }" />
</template>
  
<script lang="ts" setup>

import { computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const meta = computed(() => router.currentRoute.value.meta.isMicoAppRouter as any || null);

// 如果使用wujie-vue
import WujieVue from "wujie-vue3";
const { bus } = WujieVue;
const loadingEl = document.createElement('span')
// 主应用监听事件

onMounted(() => {
  bus.$on("microAppRouterChange", function (fullPath) {
    console.log('BaseApp');
    console.log(fullPath);
    router.push({
      path: fullPath,
    });
  });
})

watch(
  () => router.currentRoute.value.fullPath,
  (newVal) => {
    // BUG 首次emit无效，此刻为空
    bus.$emit("baseAppRouterChange", newVal);
  },
  { immediate: true }
)

</script>
  