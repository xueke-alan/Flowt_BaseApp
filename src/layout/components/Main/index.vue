<template>
  <RouterView>
    <template #default="{ Component }">
      <microAppContener />

      <div class="normalRouter-contener" :class="{ hide: ismicoAppRouter }">
        <div class="normalRouter" :key="nowRouter.fullPath">

          <component :is="Component" />
        </div>
      </div>
    </template>
  </RouterView>
</template>

<script lang="ts">
import { defineComponent, computed, unref, ref } from 'vue';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { useRouter } from 'vue-router';

import { useGlobSetting } from '@/hooks/setting';

import page100 from '@/views/exception/100.vue';
import microAppContener from './components/microAppContener.vue';

export default defineComponent({
  name: 'MainView',
  // components: {},
  props: {
    notNeedKey: {
      type: Boolean,
      default: false,
    },
    animate: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    page100,
    microAppContener,
  },

  setup() {
    const { isPageAnimate, pageAnimateType } = useProjectSetting();
    const asyncRouteStore = useAsyncRouteStore();
    // 需要缓存的路由组件

    // 切换动画

    const getTransitionName = computed(() => {
      return unref(isPageAnimate) ? unref(pageAnimateType) : '';
    });

    const router = useRouter();

    const micoAppRouters = asyncRouteStore.micoRouterListOri;
    const { sigleMicroAppContainer } = useGlobSetting();
    const micoAppRoutersNameList = computed(() => {
      if (sigleMicroAppContainer) {
        return ['micoApp'];
      } else {
        return micoAppRouters.map((r) => {
          return r.path;
        });
      }
    });


    const ismicoAppRouter = computed(() => router.currentRoute.value.meta.isMicoAppRouter);
    const nowRouter = ref(router.currentRoute);

    return {

      getTransitionName,
      ismicoAppRouter,
      nowRouter,
      micoAppRouters,
      micoAppRoutersNameList,
      sigleMicroAppContainer,
    };
  },
});
</script>

<style lang="less" scoped>
.normalRouter-contener {
  height: 100%;

  .normalRouter {
    height: 100%;
  }

  &.hide {
    height: 0;

    .normalRouter {
      height: 0;
    }
  }
}
</style>
