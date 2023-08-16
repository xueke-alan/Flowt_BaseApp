<template>
  <RouterView>
    <template #default="{ Component }">

      <qiankunContener />

      <div class="normalRouter-contener" :class="{ hide: isQiankunRouter }">
        <div class="normalRouter" :key="nowRouter.fullPath">
          <keep-alive v-if="keepAliveComponents.length" :include="keepAliveComponents">
            <component :is="Component" />
          </keep-alive>
          <component v-else :is="Component" />
        </div>
      </div>
    </template>
  </RouterView>
</template>

<script lang="ts">
import { defineComponent, computed, unref, onMounted, ref } from 'vue';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { useRouter } from "vue-router";
import { setupQiankun } from '@/qiankun/setupQiankun';
import { useGlobSetting } from '@/hooks/setting';


import page100 from "@/views/exception/100.vue";
import qiankunContener from "./components/qiankunContener.vue";


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
    qiankunContener
  },

  setup() {
    const { isPageAnimate, pageAnimateType } = useProjectSetting();
    const asyncRouteStore = useAsyncRouteStore();
    // 需要缓存的路由组件
    const keepAliveComponents = computed(() => asyncRouteStore.keepAliveComponents);
    // 切换动画

    const getTransitionName = computed(() => {
      return unref(isPageAnimate) ? unref(pageAnimateType) : '';
    });

    const router = useRouter();

    const qiankunRouters = asyncRouteStore.micoRouterListOri
    const { sigleQiankunContainer } = useGlobSetting();
    const qiankunRoutersNameList = computed(() => {
      if (sigleQiankunContainer) {
        return ['qiankun']
      } else {
        return qiankunRouters.map((r) => {
          return r.path
        })
      }
    })

    onMounted(() => {
      // 启动乾坤服务
      setupQiankun();
    });
    const isQiankunRouter = computed(() => router.currentRoute.value.meta.isQiankunRouter)
    const nowRouter = ref(router.currentRoute)

    return {
      keepAliveComponents,
      getTransitionName,
      isQiankunRouter,
      nowRouter,
      qiankunRouters,
      qiankunRoutersNameList,
      sigleQiankunContainer

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
