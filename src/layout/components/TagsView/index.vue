<template>
  <!-- TODO 右键选择的菜单的this指向 -->
  <div class="box-border tabs-view" :class="{
    'tabs-view-fix': multiTabsSetting.fixed,
    'tabs-view-fixed-header': isMultiHeaderFixed,
    'tabs-view-default-background': getDarkTheme === false,
    'tabs-view-dark-background': getDarkTheme === true,
  }" :style="getChangeStyle">
    <div class="tabs-view-main">
      <div ref="navWrap" class="tabs-card" :class="{ 'tabs-card-scrollable': true }">
        <span class="tabs-card-prev" @click="scrollPrev" v-if="scrollable">
          <n-icon size="18" color="#515a6e">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 512">
              <path
                d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"
                fill="currentColor"></path>
            </svg>
          </n-icon>
        </span>
        <span class="tabs-card-prev" @click="scrollPrev" v-if="!scrollable">
          <n-icon size="18" color="#515a6e">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">
              <path
                d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7l23.1 23.1L882 542.3h-96.1z"
                fill="currentColor"></path>
            </svg>
          </n-icon>
        </span>
        <span class="tabs-card-next" :class="{ 'tabs-card-next-hide': !scrollable }" @click="scrollNext">
          <n-icon size="18" color="#515a6e">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 512">
              <path
                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4l-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
                fill="currentColor"></path>
            </svg>
          </n-icon>
        </span>
        <div ref="navScroll" class="tabs-card-scroll">
          <Draggable :list="tabsList" animation="300" item-key="fullPath" class="flex">
            <template #item="{ element }">
              <div :id="`tag${element.fullPath.split('/').join('\/')}`" class="tabs-card-scroll-item"
                :class="{ 'active-item': activeKey === element.path }" @click.stop="goPage(element)"
                @contextmenu="handleContextMenu($event, element)">
                <n-tag round :closable="!element.meta.affix" @close.stop="closeTabItem(element)" :bordered="true" class=""
                  :color="activeKey === element.path && tabsList.length > 1 ? tagCur : {}">
                  <div>
                    <div v-if="element.meta.icon" style="margin-right: 5px;font-size: 16px;">
                      <component :is="element.meta.icon" />
                    </div>
                    <span> {{ element.meta.title }}</span>
                  </div>
                </n-tag>
              </div>
            </template>
          </Draggable>
        </div>
      </div>
      <div class="tabs-close">
        <n-dropdown trigger="click" @select="closeHandleSelect" placement="bottom-end" :options="TabsMenuOptions">
          <div class="tabs-close-btn">
            <n-icon size="18" color="#515a6e">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                <path
                  d="M15.08 9.59L12 12.67L8.92 9.59L7.5 11l4.5 4.5l4.5-4.5l-1.42-1.41zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z"
                  fill="currentColor"></path>
              </svg>
            </n-icon>
          </div>
        </n-dropdown>
      </div>
      <n-dropdown :show="showDropdown" :x="dropdownX" :y="dropdownY" @clickoutside="onClickOutside"
        placement="bottom-start" @select="closeHandleSelect" :options="TabsMenuOptions" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  ref,
  toRefs,
  provide,
  watch,
  onMounted,
  nextTick,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storage } from '@/utils/Storage';
import { TABS_ROUTES } from '@/store/mutation-types';
import { useTabsViewStore } from '@/store/modules/tabsView';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
import { RouteItem } from '@/store/modules/tabsView';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { useMessage } from 'naive-ui';
import Draggable from 'vuedraggable';
import { PageEnum } from '@/enums/pageEnum';
import {
  DownOutlined,
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
} from '@vicons/antd';
import { renderIcon } from '@/utils';
import elementResizeDetectorMaker from 'element-resize-detector';
import { useDesignSetting } from '@/hooks/setting/useDesignSetting';
import { useProjectSettingStore } from '@/store/modules/projectSetting';
import { useThemeVars } from 'naive-ui';
import { useGo } from '@/hooks/web/usePage';
import { ArrowSync24Regular, Backspace24Regular, DismissSquare24Regular, BookmarkOff24Regular } from '@vicons/fluent';

export default defineComponent({
  name: 'TabsView',
  components: {
    DownOutlined,
    CloseOutlined,
    LeftOutlined,
    RightOutlined,
    Draggable,
  },
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  setup(props) {
    const { getDarkTheme, getAppTheme } = useDesignSetting();
    const { navMode, headerSetting, menuSetting, multiTabsSetting, isMobile } =
      useProjectSetting();
    const settingStore = useProjectSettingStore();

    const message = useMessage();
    const route = useRoute();
    const router = useRouter();
    const tabsViewStore = useTabsViewStore();
    const asyncRouteStore = useAsyncRouteStore();
    const navScroll: any = ref(null);
    const navWrap: any = ref(null);
    const isCurrent = ref(false);
    // const tagCur = ref({ color: '#00000010', textColor: '#000', borderColor: '#ddd' } );
    const go = useGo();

    const themeVars = useThemeVars();

    const getCardColor = computed(() => {
      return themeVars.value.cardColor;
    });

    const tagCur = computed(() => {

      return { color: '#aaaaaa30', borderColor: '#88888888' };

    });

    const getBaseColor = computed(() => {
      return themeVars.value.textColor1;
    });

    const state = reactive({
      activeKey: route.fullPath,
      scrollable: false,
      dropdownX: 0,
      dropdownY: 0,
      showDropdown: false,
      isMultiHeaderFixed: false,
      multiTabsSetting: multiTabsSetting,
    });

    // 获取简易的路由对象
    const getSimpleRoute = (route): RouteItem => {
      const { fullPath, hash, meta, name, params, path, query } = route;
      return { fullPath, hash, meta, name, params, path, query };
    };

    const isMixMenuNoneSub = computed(() => {
      const mixMenu = settingStore.menuSetting.mixMenu;
      const currentRoute = useRoute();
      if (navMode.value != 'horizontal-mix') return true;
      return !(navMode.value === 'horizontal-mix' && mixMenu && currentRoute.meta.isRoot);
    });

    //动态组装样式 菜单缩进
    const getChangeStyle = computed(() => {
      const { collapsed } = props;
      const { minMenuWidth, menuWidth }: any = menuSetting.value;
      const { fixed }: any = multiTabsSetting.value;
      let lenNum =
        navMode.value === 'horizontal' || !isMixMenuNoneSub.value
          ? '0px'
          : collapsed
            ? `${minMenuWidth}px`
            : `${menuWidth}px`;

      if (isMobile.value) {
        return {
          left: '0px',
          width: '100%',
        };
      }
      return {
        left: lenNum,
        width: `calc(100% - ${!fixed ? '0px' : lenNum})`,
      };
    });

    //tags 右侧下拉菜单
    const TabsMenuOptions = computed(() => {
      const isDisabled = tabsList.value.length <= 1;
      return [

        // {
        //   label: `关闭当前`,
        //   key: '2',
        //   disabled: isCurrent.value || isDisabled,
        //   icon: renderIcon(DismissSquare24Regular),
        // },
        {
          label: '关闭其他',
          key: '3',
          disabled: isDisabled,
          icon: renderIcon(Backspace24Regular),
        },
        {
          label: '关闭全部',
          key: '4',
          disabled: isDisabled,
          icon: renderIcon(BookmarkOff24Regular),
        },
      ];
    });

    let cacheRoutes: RouteItem[] = [];
    const simpleRoute = getSimpleRoute(route);
    try {
      const routesStr = storage.get(TABS_ROUTES) as string | null | undefined;
      cacheRoutes = routesStr ? JSON.parse(routesStr) : [simpleRoute];
    } catch (e) {
      cacheRoutes = [simpleRoute];
    }

    // 将最新的路由信息同步到 localStorage 中
    const routes = router.getRoutes();
    cacheRoutes.forEach((cacheRoute) => {
      const route = routes.find((route) => route.path === cacheRoute.path);
      if (route) {
        cacheRoute.meta = route.meta || cacheRoute.meta;
        cacheRoute.name = (route.name || cacheRoute.name) as string;
      }
    });

    // 初始化标签页
    tabsViewStore.initTabs(cacheRoutes);

    //监听滚动条
    function onScroll(e) {
      let scrollTop =
        e.target.scrollTop ||
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop; // 滚动条偏移量
      state.isMultiHeaderFixed = !!(
        !headerSetting.value.fixed &&
        multiTabsSetting.value.fixed &&
        scrollTop >= 64
      );
    }

    window.addEventListener('scroll', onScroll, true);

    // 移除缓存组件名称
    

    // 标签页列表
    const tabsList: any = computed(() => tabsViewStore.tabsList);
    const whiteList: string[] = [
      PageEnum.BASE_LOGIN_NAME,
      PageEnum.REDIRECT_NAME,
      PageEnum.ERROR_PAGE_NAME,
    ];

    watch(
      () => route.fullPath,
      (to) => {

        if (whiteList.includes(route.name as string)) return;
        state.activeKey = to;
        tabsViewStore.addTab(getSimpleRoute(route));
        updateNavScroll(true);
      },
      { immediate: true }
    );

    // 在页面关闭或刷新之前，保存数据
    window.addEventListener('beforeunload', () => {
      storage.set(TABS_ROUTES, JSON.stringify(tabsList.value));
    });

    // 关闭当前页面
    const removeTab = (route) => {
      if (tabsList.value.length === 1) {
        return message.warning('这已经是最后一页，不能再关闭了！');
      }
    
      tabsViewStore.closeCurrentTab(route);
      // 如果关闭的是当前页
      if (state.activeKey === route.fullPath) {
        const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)];
        state.activeKey = currentRoute.fullPath;
        router.push(currentRoute);
      }
      updateNavScroll();
    };

    // 刷新页面
    const reloadPage = () => {
   
      router.push({
        path: '/redirect' + route.fullPath,
      });
    };

    // 注入刷新页面方法
    provide('reloadPage', reloadPage);

    // 关闭左侧
    const closeLeft = (route) => {
      tabsViewStore.closeLeftTabs(route);
      state.activeKey = route.fullPath;
      router.replace(route.fullPath);
      updateNavScroll();
    };

    // 关闭右侧
    const closeRight = (route) => {
      tabsViewStore.closeRightTabs(route);
      state.activeKey = route.fullPath;
      router.replace(route.fullPath);
      updateNavScroll();
    };

    // 关闭其他
    const closeOther = (route) => {
      tabsViewStore.closeOtherTabs(route);
      state.activeKey = route.fullPath;
      router.replace(route.fullPath);
      updateNavScroll();
    };

    // 关闭全部
    const closeAll = () => {
      tabsViewStore.closeAllTabs();
      router.replace(PageEnum.BASE_HOME);
      updateNavScroll();
    };

    //tab 操作
    const closeHandleSelect = (key) => {
      switch (key) {
        //刷新
        case '1':
          reloadPage();
          break;
        //关闭
        case '2':
          removeTab(route);
          break;
        //关闭其他
        case '3':
          closeOther(route);
          break;
        //关闭所有
        case '4':
          closeAll();
          break;
      }
      updateNavScroll();
      state.showDropdown = false;
    };

    /**
     * @param value 要滚动到的位置
     * @param amplitude 每次滚动的长度
     */
    function scrollTo(value: number, amplitude: number) {
      const currentScroll = navScroll.value.scrollLeft;
      const scrollWidth =
        (amplitude > 0 && currentScroll + amplitude >= value) ||
          (amplitude < 0 && currentScroll + amplitude <= value)
          ? value
          : currentScroll + amplitude;
      navScroll.value && navScroll.value.scrollTo(scrollWidth, 0);
      if (scrollWidth === value) return;
      return window.requestAnimationFrame(() => scrollTo(value, amplitude));
    }

    function scrollPrev() {
      const containerWidth = navScroll.value.offsetWidth;


      const currentScroll = navScroll.value.scrollLeft;
      if (!currentScroll) return;
      const scrollLeft = currentScroll > containerWidth ? currentScroll - containerWidth : 0;
      scrollTo(scrollLeft / 2, (scrollLeft - currentScroll) / 20);
    }

    function scrollNext() {
      const containerWidth = navScroll.value.offsetWidth;
      const navWidth = navScroll.value.scrollWidth;
      const currentScroll = navScroll.value.scrollLeft;

      if (navWidth - currentScroll <= containerWidth) return;
      const scrollLeft =
        navWidth - currentScroll > containerWidth * 2
          ? currentScroll + containerWidth
          : navWidth - containerWidth;
      scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
    }

    /**
     * @param autoScroll 是否开启自动滚动功能
     */
    async function updateNavScroll(autoScroll?: boolean) {
      await nextTick();
      if (!navScroll.value) return;
      const containerWidth = navScroll.value.offsetWidth;
      const navWidth = navScroll.value.scrollWidth;

      if (containerWidth < navWidth) {
        state.scrollable = true;
        if (autoScroll) {
          let tagList = navScroll.value.querySelectorAll('.tabs-card-scroll-item') || [];
          [...tagList].forEach((tag: HTMLElement) => {
            // fix SyntaxError
            if (tag.id === `tag${state.activeKey.split('/').join('\/')}`) {
              tag.scrollIntoView && tag.scrollIntoView();
            }
          });
        }
      } else {
        state.scrollable = false;
      }
    }

    function handleResize() {
      updateNavScroll(true);
    }

    function handleContextMenu(e, item) {
      e.preventDefault();
      isCurrent.value = PageEnum.BASE_HOME_REDIRECT === item.path;
      state.showDropdown = false;
      nextTick().then(() => {
        state.showDropdown = true;
        state.dropdownX = e.clientX;
        state.dropdownY = e.clientY;
      });
    }

    function onClickOutside() {
      state.showDropdown = false;
    }

    //tags 跳转页面
    function goPage(e) {
      const { fullPath } = e;
      if (fullPath === route.fullPath) return;
      state.activeKey = fullPath;
      go(e, true);
    }

    //删除tab
    function closeTabItem(e) {
      const { fullPath } = e;
      const routeInfo = tabsList.value.find((item) => item.fullPath == fullPath);
      removeTab(routeInfo);
    }

    onMounted(() => {
      onElementResize();
    });

    function onElementResize() {
      let observer;
      observer = elementResizeDetectorMaker();
      observer.listenTo(navWrap.value, handleResize);
    }

    return {
      ...toRefs(state),
      navWrap,
      navScroll,
      route,
      tabsList,
      goPage,
      closeTabItem,
      closeLeft,
      closeRight,
      closeOther,
      closeAll,
      reloadPage,
      tagCur,
      getChangeStyle,
      TabsMenuOptions,
      closeHandleSelect,
      scrollNext,
      scrollPrev,
      handleContextMenu,
      onClickOutside,
      getDarkTheme,
      getAppTheme,
      getCardColor,
      getBaseColor,
    };
  },
});
</script>



<style lang="less" scoped>
.tabs-view {
  width: 100%;
  padding: 6px 0;
  display: flex;
  transition: all 0.2s ease-in-out;

  &-main {
    height: 32px;
    display: flex;
    max-width: 100%;
    min-width: 100%;
    align-items: center;

    .tabs-card {
      -webkit-box-flex: 1;
      flex-grow: 1;
      flex-shrink: 1;
      overflow: hidden;
      position: relative;

      .tabs-card-prev,
      .tabs-card-next {
        width: 32px;
        text-align: center;
        position: absolute;
        line-height: 32px;
        cursor: pointer;

        .n-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          width: 32px;
        }
      }

      .tabs-card-prev {
        left: 0;

      }

      .tabs-card-next {
        right: 0;
      }

      .tabs-card-next-hide,
      .tabs-card-prev-hide {
        display: none;
      }

      &-scroll {
        white-space: nowrap;
        overflow: hidden;

        &-item {
          background: v-bind(getCardColor);
          color: v-bind(getBaseColor);
          height: 32px;
          padding: 6px 16px 4px;
          border-radius: 3px;
          margin-right: 6px;
          cursor: pointer;
          display: inline-block;
          position: relative;
          flex: 0 0 auto;

          span {
            float: left;
            vertical-align: middle;
          }

          &:hover {
            color: #515a6e;
          }

          .n-icon {
            height: 22px;
            width: 21px;
            margin-right: -6px;
            position: relative;
            vertical-align: middle;
            text-align: center;
            color: #808695;

            &:hover {
              color: #515a6e !important;
            }

            svg {
              height: 21px;
              display: inline-block;
            }
          }
        }

        .active-item {
          color: v-bind(getAppTheme);
        }
      }
    }

    .tabs-card-scrollable {
      padding: 0 32px;
      overflow: hidden;
      display: flex;
      align-items: center;
    }
  }

  .tabs-close {
    min-width: 32px;
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background: var(--color);
    border-radius: 2px;
    cursor: pointer;

    &-btn {
      color: var(--color);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.tabs-view-main .tabs-card-scroll-item {
  padding: 0;
  display: flex;
  align-items: center;
  background-color: transparent;
  height: 100%;

  .n-tag {}

  &.active-item {}

  * {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
}

.tabs-view-default-background {
  background: #f5f7f9;

}

.tabs-view-dark-background {
  background: #101014;
}

.tabs-view-fix {
  position: fixed;
  z-index: 5;
  padding: 6px 10px 6px 10px;
  left: 200px;
}

.tabs-view-fixed-header {
  top: 0;
}
</style>