<template>
  <RouterView>

    <template #default="{ Component, route }">

      <div id="main-view-qiankun" :class="{ show: isQiankunRouter }"></div>
      <!-- {{ isQiankunRouter }} -->
      <transition :name="getTransitionName" mode="out-in" appear>


        <keep-alive v-if="keepAliveComponents.length" :include="keepAliveComponents">
          <component :is="Component" />
        </keep-alive>

        <component v-else :is="Component" />

      </transition>

    </template>
  </RouterView>
</template>

<script>
import { defineComponent, computed, unref, onMounted, ref } from 'vue';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { useRouter } from "vue-router";
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
      nowRouter
    };
  },
});
</script>

<style lang="less" scoped>
#main-view-qiankun {
  opacity: 0;
  transition: opacity .2s ease;
  height: 100%;
  max-height: 0;

  &.show {
    opacity: 1;
    max-height: 10000px;
  }

}
</style>
