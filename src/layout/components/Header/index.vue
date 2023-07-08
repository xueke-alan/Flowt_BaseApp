<template>
  <div class="layout-header">
    <!--顶部菜单-->
    <div class="layout-header-left" v-if="navMode === 'horizontal' || (navMode === 'horizontal-mix' && mixMenu)">
      <div class="logo" v-if="navMode === 'horizontal'">
        <img :src="websiteConfig.logo" alt="" />
        <h2 v-show="!collapsed" class="title">{{ websiteConfig.title }}</h2>
      </div>
      <AsideMenu v-model:collapsed="collapsed" v-model:location="getMenuLocation" :inverted="getInverted"
        mode="horizontal" />
    </div>
    <!--左侧菜单-->
    <div class="layout-header-left" v-else>
      <!-- 菜单收起 -->
      <div class="ml-2 layout-header-trigger layout-header-trigger-min"
        @click="() => $emit('update:collapsed', !collapsed)">
        <n-icon size="25" v-if="collapsed">
          <component :is="PanelRightContract24Regular" />

        </n-icon>
        <n-icon size="25" v-else>
          <component :is="PanelLeftContract24Regular" />

        </n-icon>
      </div>
      <!-- 刷新 -->
      <div class="layout-header-trigger layout-header-trigger-min" v-if="headerSetting.isReload" @click="reloadPage">
        <n-icon size="20">
          <!-- <ReloadOutlined /> -->
          <component :is="ArrowClockwise16Filled" />

        </n-icon>
      </div>
      <n-icon size="24" class="mr-1" style="pointer-events: none; opacity: .3;">
        <component :is="DividerShort20Filled" />
      </n-icon>
      <!-- <n-divider vertical /> -->

      <!-- 面包屑 -->

      <n-breadcrumb v-if="crumbsSetting.show">
        <template v-for="routeItem in breadcrumbList" :key="routeItem.name === 'Redirect' ? void 0 : routeItem.name">
          <n-breadcrumb-item v-if="routeItem.meta.title && !routeItem.meta.hideBreadcrumb">
            <n-dropdown v-if="routeItem.children.length"
              :options="routeItemChildren(routeItem.children).length > 1 ? routeItemChildren(routeItem.children) : null"
              @select="dropdownSelect">
              <span class="link-text">
                <component v-if="crumbsSetting.showIcon && routeItem.meta.icon" :is="routeItem.meta.icon" />
                {{ routeItem.meta.title }}
              </span>
            </n-dropdown>

            <span class="link-text" v-else>
              <component v-if="crumbsSetting.showIcon && routeItem.meta.icon" :is="routeItem.meta.icon" />
              {{ routeItem.meta.title }}
            </span>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>
    <n-input-group style="justify-content: flex-end;" class="mr-3">
      <!-- <n-input-group-label round >https://www.</n-input-group-label> -->

      <n-input round size="small" :style="{ maxWidth: searchBarWidth }" class="searchBar" placeholder="Search"
        :on-focus="() => { searchBarWidth = '300px' }" :on-blur="() => { searchBarWidth = '200px' }">
        <template #prefix>
          <n-icon size="18" style="pointer-events: none;">
            <component :is="Flash20Regular" />
          </n-icon>
        </template>
      </n-input>
    </n-input-group>

    <div class="layout-header-right">
      <!-- 前面的按钮 -->

      <!--测试单详情-->

      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="20">
              <component :is="PuzzlePiece24Regular" />
            </n-icon>
          </template>
          <span>快捷应用</span>
        </n-tooltip>
      </div>

      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="20">
              <TooltipQuote24Regular />
              <!-- <img src="@vicons/fluent/" /> -->
            </n-icon>
          </template>
          <span>提示</span>
        </n-tooltip>
      </div>

      <n-icon size="24" class="mr-1" style="pointer-events: none; opacity: .3;">
        <component :is="DividerShort20Filled" />
      </n-icon>

      <!--切换全屏-->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="20">
              <component :is="ExpandUpRight24Regular" @click="toggleFullScreen" />
            </n-icon>
          </template>
          <span>全屏</span>
        </n-tooltip>
      </div>

      <!--提醒-->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <div style="display: flex;">
              <n-badge dot :offset="[16, 0]" processing style="position: absolute;" />
              <n-icon size="22">
                <component :is="Alert32Regular" />
              </n-icon>
            </div>
          </template>
          <span>提醒</span>
        </n-tooltip>
      </div>

      <!-- 个人中心 -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-dropdown trigger="hover" @select="avatarSelect" :options="avatarOptions">
          <div class="avatar">
            <n-avatar :size="20" src="blob:https://account.microsoft.com/7ec0f03c-02ff-4621-92f0-b70908aa12df"
              fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />


          </div>
        </n-dropdown>
      </div>
      <!--设置-->
      <div class="layout-header-trigger layout-header-trigger-min" @click="openSetting">
        <n-tooltip placement="bottom-end">
          <template #trigger>
            <n-icon size="20" style="font-weight: bold">
              <SettingOutlined />

            </n-icon>
          </template>
          <span>项目配置</span>
        </n-tooltip>
      </div>
    </div>
  </div>
  <!--项目配置-->
  <ProjectSetting ref="drawerSetting" />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed, unref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import components from './components';
import { NDialogProvider, useDialog, useMessage } from 'naive-ui';
import { TABS_ROUTES } from '@/store/mutation-types';
import { useUserStore } from '@/store/modules/user';
import ProjectSetting from './ProjectSetting.vue';
import { AsideMenu } from '@/layout/components/Menu';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { websiteConfig } from '@/config/website.config';
import { Alert32Regular, TooltipQuote24Regular, PuzzlePiece24Regular, Flash20Regular, ExpandUpRight24Regular, Search32Filled, DividerShort20Filled, ArrowClockwise16Filled, PanelRightContract24Regular, PanelLeftContract24Regular } from '@vicons/fluent'


export default defineComponent({
  name: 'PageHeader',
  components: { ...components, NDialogProvider, ProjectSetting, AsideMenu, TooltipQuote24Regular },
  props: {
    collapsed: {
      type: Boolean,
    },
    inverted: {
      type: Boolean,
    },
  },
  setup(props) {
    const userStore = useUserStore();
    // const useLockscreen = useScreenLockStore();
    const message = useMessage();
    const dialog = useDialog();
    const { navMode, navTheme, headerSetting, menuSetting, crumbsSetting } = useProjectSetting();

    const { name } = userStore?.info || {};

    const drawerSetting = ref();

    const state = reactive({
      username: name ?? '',
      fullscreenIcon: 'FullscreenOutlined',
      navMode,
      navTheme,
      searchBarWidth: "200px",
      headerSetting,
      crumbsSetting,
    });

    const getInverted = computed(() => {
      return ['light', 'header-dark'].includes(unref(navTheme))
        ? props.inverted
        : !props.inverted;
    });

    const routeItemChildren = (children) => {
      children.forEach((i) => { i.icon = i.meta.icon })
      return children
    };

    const mixMenu = computed(() => {
      return unref(menuSetting).mixMenu;
    });

    const getChangeStyle = computed(() => {
      const { collapsed } = props;
      const { minMenuWidth, menuWidth } = unref(menuSetting);
      return {
        left: collapsed ? `${minMenuWidth}px` : `${menuWidth}px`,
        width: `calc(100% - ${collapsed ? `${minMenuWidth}px` : `${menuWidth}px`})`,
      };
    });

    const getMenuLocation = computed(() => {
      return 'header';
    });

    const router = useRouter();
    const route = useRoute();

    const generator: any = (routerMap) => {
      return routerMap.map((item) => {
        const currentMenu = {
          ...item,
          label: item.meta.title,
          key: item.name,
          disabled: item.path === '/',
        };
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
          // Recursion
          currentMenu.children = generator(item.children, currentMenu);
        }
        return currentMenu;
      });
    };

    const breadcrumbList = computed(() => {
      return generator(route.matched);
    });

    const dropdownSelect = (key) => {
      router.push({ name: key });
    };

    // 刷新页面
    const reloadPage = () => {
      router.push({
        path: '/redirect' + unref(route).fullPath,
      });
    };

    // 退出登录
    const doLogout = () => {
      dialog.info({
        title: '提示',
        content: '您确定要退出登录吗',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          userStore.logout().then(() => {
            message.success('成功退出登录');
            // 移除标签页
            localStorage.removeItem(TABS_ROUTES);
            router
              .replace({
                name: 'Login',
                query: {
                  redirect: route.fullPath,
                },
              })
              .finally(() => location.reload());
          });
        },
        onNegativeClick: () => { },
      });
    };

    // 切换全屏图标
    const toggleFullscreenIcon = () =>
    (state.fullscreenIcon =
      document.fullscreenElement !== null ? 'FullscreenExitOutlined' : 'FullscreenOutlined');

    // 监听全屏切换事件
    document.addEventListener('fullscreenchange', toggleFullscreenIcon);

    // 全屏切换
    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    };

    // 图标列表
    const iconList = [
      {
        icon: 'SearchOutlined',
        tips: '搜索',
      },
      {
        icon: 'GithubOutlined',
        tips: 'github',
        eventObject: {
          click: () => window.open('https://github.com/jekip/naive-ui-admin'),
        },
      },
      // {
      //   icon: 'LockOutlined',
      //   tips: '锁屏',
      //   eventObject: {
      //     click: () => useLockscreen.setLock(true),
      //   },
      // },
    ];
    const avatarOptions = [
      {
        label: '个人设置',
        key: 1,
      },
      {
        label: '退出登录',
        key: 2,
      },
    ];

    //头像下拉菜单
    const avatarSelect = (key) => {
      switch (key) {
        case 1:
          router.push({ name: 'Setting' });
          break;
        case 2:
          doLogout();
          break;
      }
    };

    function openSetting() {
      const { openDrawer } = drawerSetting.value;
      openDrawer();
    }

    function searchFocus(params) {
      console.log(params);

    }

    return {
      ...toRefs(state),
      iconList,
      toggleFullScreen,
      doLogout,
      route,
      dropdownSelect,
      avatarOptions,
      getChangeStyle,
      avatarSelect,
      breadcrumbList,
      reloadPage,
      drawerSetting,
      openSetting,
      getInverted,
      getMenuLocation,
      mixMenu,
      routeItemChildren,
      websiteConfig,
      Alert32Regular,
      ExpandUpRight24Regular,
      Search32Filled,
      searchFocus,
      ArrowClockwise16Filled, PuzzlePiece24Regular, PanelRightContract24Regular, PanelLeftContract24Regular, DividerShort20Filled, Flash20Regular, TooltipQuote24Regular
    };
  },
});
</script>

<style lang="less" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: 50px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: all 0.2s ease-in-out;
  width: 100%;
  z-index: 11;

  &-left {
    display: flex;
    align-items: center;

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      // height: 64px;
      height: 100%;
      line-height: 64px;
      overflow: hidden;
      white-space: nowrap;
      padding-left: 10px;

      img {
        width: auto;
        height: 32px;
        margin-right: 10px;
      }

      .title {
        margin-bottom: 0;
      }
    }

    ::v-deep(.ant-breadcrumb span:last-child .link-text) {
      color: #515a6e;
    }

    ::v-deep(.n-breadcrumb .n-breadcrumb-item) {
      padding-top: 1px;
    }

    .n-breadcrumb {
      display: inline-block;
    }

    &-menu {
      color: var(--text-color);
    }
  }

  &-right {
    display: flex;
    align-items: center;
    margin-right: 10px;

    .avatar {
      display: flex;
      align-items: center;
      // height: 64px;
      height: 100%;
    }

    >* {
      cursor: pointer;
    }
  }

  .searchBar {
    transition: all .3s var(--n-bezier);
  }

  &-trigger {
    display: inline-block;
    width: 64px;
    // height: 64px;
    height: 100%;
    text-align: center;
    cursor: pointer;
    // transition: all 0.2s ease-in-out;

    .n-icon {
      display: flex;
      align-items: center;
      // height: 64px;
      height: 100%;
      line-height: 64px;
    }

    &:hover {
      background: hsla(0, 0%, 100%, 0.08);
    }

    .anticon {
      font-size: 16px;
      color: #515a6e;
    }
  }

  &-trigger-min {
    width: auto;
    padding: 0 8px;
  }
}

.layout-header-light {
  background: #fff;
  color: #515a6e;

  .n-icon {
    color: #515a6e;
  }

  .layout-header-left {
    ::v-deep(.n-breadcrumb .n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
      color: #515a6e;
    }
  }

  .layout-header-trigger {
    &:hover {
      background: #f8f8f9;
    }
  }
}

.layout-header-fix {
  position: fixed;
  top: 0;
  right: 0;
  left: 200px;
  z-index: 11;
}

//::v-deep(.menu-router-link) {
//  color: #515a6e;
//
//  &:hover {
//    color: #1890ff;
//  }
//}
</style>
