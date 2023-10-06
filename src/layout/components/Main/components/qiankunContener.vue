<template>
  <div id="main-view-qiankun-contener" :class="{ hide: !isQiankunRouter }">
    <page100 class="cover" :class="{ show: qiankunBus.loading }" />
    <div :id="'main-view-qiankun-' + r" v-for="r in qiankunRoutersNameList" v-show="showContener(r)">
      <!-- TODO 乾坤加载完毕之后才卸载遮罩。 -->
      <!-- 数据库显示已开发却没有上限 -->
    </div>
  </div>
</template>

<script lang="ts" setup>

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGlobSetting } from '@/hooks/setting';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
import { useQiankunBusStore } from '@/store/modules/qiankun';
import page100 from '@/views/exception/100.vue';
const router = useRouter();
const nowRouter = ref(router.currentRoute);
const isQiankunRouter = computed(() => router.currentRoute.value.meta.isQiankunRouter);

const qiankunBus = useQiankunBusStore();

const GlobSetting = useGlobSetting();
const asyncRouteStore = useAsyncRouteStore();
const qiankunRouters = asyncRouteStore.micoRouterListOri;
const qiankunRoutersNameList = computed(() => {
  if (GlobSetting.sigleQiankunContainer) {
    return ['qiankun'];
  } else {
    return qiankunRouters.map((r) => {
      return r.path;
    });
  }
});


const showContener = (r) => {
  return GlobSetting.sigleQiankunContainer || nowRouter.value.fullPath.indexOf(r) > 0;
};
</script>

<style lang="less" scoped>


#main-view-qiankun-contener {
  height: 100%;
  max-height: inherit;
  overflow: visible;
  transition: all ease 0.3s;
  display: flex;
  align-items: center;


  [id*='main-view-qiankun-'] {
    height: 100%;
    width: 100%;
    flex: 1;
  }

  .cover {
    position: absolute;
    top: 0;
    z-index: 10;
    background-color: var(--n-color);
    opacity: 0;
    transition: opacity .5s ease .5s;
    pointer-events: none;

    &.show {
      opacity: 1;

      pointer-events: all;
    }
  }

  &.hide {
    max-height: 0;
    overflow: hidden;
    display: none;
    opacity: 0;
  }

}
</style>

<style lang="less">
#main-view-qiankun-contener {
  [id*='__qiankun_microapp_wrapper'] {
    height: 100%;
  }
}
</style>
