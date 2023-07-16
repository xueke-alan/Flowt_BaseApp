<template>
  <RouterView>

    <template #default="{ Component, route }">


      <div id="main-view-qiankun-contener" class="fadeOut" :key="nowRouter.fullPath" :class="{ show: isQiankunRouter }">
        <div id="main-view-qiankun">
          <page100 />
        </div>
      </div>



      <!-- {{ isQiankunRouter }} -->
      <transition :name="getTransitionName" mode="out-in" appear>


        <keep-alive v-if="keepAliveComponents.length" :include="keepAliveComponents">
          <component :is="Component" />
        </keep-alive>

        <component v-else :is="Component" :key="nowRouter.fullPath" />

      </transition>

    </template>
  </RouterView>
</template>

<script>
import { defineComponent, computed, unref, onMounted, ref } from 'vue';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { useRouter } from "vue-router";
import page100 from "@/views/exception/100.vue";
const router = useRouter();

export default defineComponent({
  name: 'MainView',
  components: {},
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

  &.show {
    max-height: 10000px;
  }
}

#main-view-qiankun {
  height: 100%;
}

.fadeOut {
  -webkit-animation: fade-out .3s ease reverse both;
  animation: fade-out .3s ease reverse both;
}

@-webkit-keyframes fade-out {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
