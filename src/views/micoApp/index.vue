<template>
  <WujieVue width="100%" height="100%" :sync="false" v-if="meta" :name="meta.name" :url="meta.entry" :loading="loadingEl"
    :exec="true" :alive="true" :props="wujieprops" :loadError="loadError" :beforeUnmount="beforeUnmount" />
</template>
  
<script lang="ts" setup>

import { onUnmounted } from 'vue';
import { computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import { useDesignSettingStore } from '@/store/modules/designSetting';
const designStore = useDesignSettingStore();

const wujieprops = {
  currentRoutePath: router.currentRoute.value.fullPath,
  designStore,
  darkTheme: designStore.darkTheme
}
const props = defineProps(['meta'])
const meta = computed(() => {
  if (props.meta) {
    return props.meta
  } else {
    return router.currentRoute.value.meta.isMicoAppRouter as any || null
  }
});




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

const beforeUnmount = () => {
  console.log('beforeUnmount');

}

watch(
  () => router.currentRoute.value.fullPath,
  (newVal) => {
    // BUG 首次emit无效，此刻为空
    bus.$emit("baseAppRouterChange", newVal);
  },
  { immediate: true }
)
const loadError = () => {
  console.log('loadError');
}
</script>
  