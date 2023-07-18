<template>
  <RouterView>

    <template #default="{ Component, route }">




      <div id="main-view-qiankun-contener" class="fadeIn" :class="{ show: isQiankunRouter }">

        <div id="main-view-qiankun">
          <page100 />
        </div>
      </div>


      <div class="normalRouter-contener" :class="{ hide: isQiankunRouter }">

        <div class="normalRouter fadeIn" :key="nowRouter.fullPath">

          <keep-alive v-if="keepAliveComponents.length" :include="keepAliveComponents">
            <component :is="Component" />
          </keep-alive>

          <component v-else :is="Component" />
        </div>

      </div>
    </template>
  </RouterView>
</template>

<script >
import { defineComponent, computed, unref, onMounted, ref } from 'vue';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { useRouter } from "vue-router";
import { setupQiankun } from '@/qiankun/setupQiankun';

import page100 from "@/views/exception/100.vue";
// const router = useRouter();

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
    page100
  },
  setup() {
    const { isPageAnimate, pageAnimateType } = useProjectSetting();
    const asyncRouteStore = useAsyncRouteStore();
    // 需要缓存的路由组件
    const keepAliveComponents = computed(() => asyncRouteStore.keepAliveComponents);

    const getTransitionName = computed(() => {
      return unref(isPageAnimate) ? unref(pageAnimateType) : '';
    });
    const router = useRouter();
    onMounted(() => {

      console.log('======');
      // console.log('router', router.currentRoute);

      // 启动乾坤服务
      console.log(router.getRoutes());
      setupQiankun();

      console.log('isQiankunRouter', router.currentRoute.value.meta.isQiankunRouter);
    });
    const isQiankunRouter = computed(() => router.currentRoute.value.meta.isQiankunRouter)
    const nowRouter = ref(router.currentRoute)
    console.log(isQiankunRouter);
    return {
      keepAliveComponents,
      getTransitionName,
      isQiankunRouter,
      nowRouter,
      // router
    };
  },
});
</script>

<style lang="less" scoped>
#main-view-qiankun-contener {
  height: 100%;
  max-height: 0;
  overflow: hidden;
  transition: opacity ease .5s;
  display: none;

  &.show {
    max-height: inherit;
    overflow: visible;
    display: block;
    opacity: 0;
  }
}

#main-view-qiankun {
  height: 100%;
}

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

.fadeIn {
  animation: fade-out .3s ease-in both .1s;
}



@keyframes fade-out {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
