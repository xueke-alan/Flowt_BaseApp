<template>
  <div id="main-view-micoApp-contener" :class="{ hide: !isMicoAppRouter }">
    <WujieVue width="100%" height="100%" name="xxx" url="http://localhost:5173/fileLibrary" :sync="false"></WujieVue>
  </div>
</template>

<script lang="ts" setup>

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
const router = useRouter();
const isMicoAppRouter = computed(() => router.currentRoute.value.meta.isMicoAppRouter);

const nowRouter = ref(router.currentRoute);
const asyncRouteStore = useAsyncRouteStore();

</script>

<style lang="less" scoped>
#main-view-micoApp-contener {
  height: 100%;
  max-height: inherit;
  overflow: visible;
  transition: all ease 0.3s;
  display: flex;
  align-items: center;


  [id*='main-view-micoApp-'] {
    height: 100%;
    width: 100%;
    flex: 1;
  }

}
</style>
