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
      <!-- <div class="layout-header-trigger layout-header-trigger-min" v-for="item in iconList" :key="item.icon">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="20">
              <component :is="item.icon" v-on="item.eventObject || {}" />
            </n-icon>
          </template>
          <span>{{ item.tips }}</span>
        </n-tooltip>
      </div> -->
      <!--切换全屏-->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="20">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                  <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path>
                  <path d="M9 17v-5"></path>
                  <path d="M12 17v-1"></path>
                  <path d="M15 17v-3"></path>
                </g>
              </svg>
            </n-icon>
          </template>
          <span>测试单详情</span>
        </n-tooltip>
      </div>
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="20">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                <g fill="none">
                  <path
                    d="M17.5 12a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11zm-13-2.628v8.378a1.75 1.75 0 0 0 1.607 1.744l.143.006h5.064c.172.534.412 1.038.709 1.501L6.25 21a3.25 3.25 0 0 1-3.245-3.066L3 17.75V9.372a2.247 2.247 0 0 0 1.5 0zm14 10.63h-2l.007.116a1 1 0 0 0 1.993-.116zM17.503 14l-.167.007c-.937.085-1.67.764-1.809 1.635l-.018.155l-.006.204v1.293l-.856.854a.5.5 0 0 0 .267.846l.086.008h5a.5.5 0 0 0 .41-.788l-.056-.066l-.849-.849v-1.352L19.5 15.8C19.422 14.788 18.556 14 17.503 14zm-4.696-.997c-.426.444-.79.95-1.076 1.5H8.748a.75.75 0 0 1-.102-1.493l.102-.007h4.059zM17.75 3a3.25 3.25 0 0 1 3.245 3.066L21 6.25v5.772a6.47 6.47 0 0 0-1.5-.708V6.25a1.75 1.75 0 0 0-1.606-1.744L17.75 4.5H6.25c-.6 0-1.13.302-1.445.763a2.234 2.234 0 0 0-1.581-.201a3.253 3.253 0 0 1 2.842-2.057L6.25 3h11.5zm-2.498 6.496a.75.75 0 0 1 .102 1.493l-.102.007H8.748a.75.75 0 0 1-.102-1.493l.102-.007h6.504zM3.75 6a1.25 1.25 0 1 1 0 2.5a1.25 1.25 0 0 1 0-2.5z"
                    fill="currentColor"></path>
                </g>
              </svg>
            </n-icon>
          </template>
          <span>订阅的测试单</span>
        </n-tooltip>
      </div>

      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="20">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                <g fill="none">
                  <path
                    d="M13 2.004a2.998 2.998 0 0 1 2.993 2.819l.005.176h2.251c.868 0 1.588.631 1.726 1.46l.019.147l.005.144v3.75L18 10.502a1.5 1.5 0 0 0-1.48 1.239l-.015.132l-.005.129a1.5 1.5 0 0 0 1.239 1.48l.132.015l.129.005h1.997L20 17.252a1.75 1.75 0 0 1-1.606 1.745l-.144.005H16l-.005.172a3.001 3.001 0 0 1-2.638 2.803l-.18.016l-.177.005a3 3 0 0 1-2.995-2.82L10 19.002H7.75a1.75 1.75 0 0 1-1.725-1.458l-.019-.148L6 17.253V15l-.164-.005a3 3 0 0 1-2.802-2.638l-.016-.18L3.012 12a3 3 0 0 1 2.823-2.995l.163-.005L6 6.75c0-.867.631-1.587 1.459-1.726l.148-.019L7.749 5L10 4.999l.005-.171a3 3 0 0 1 2.639-2.803l.18-.016l.176-.005zm0 1.5a1.5 1.5 0 0 0-1.494 1.356l-.007.145l-.001 1.494H7.749a.25.25 0 0 0-.243.193L7.5 6.75v3.75l-1.487.001a1.5 1.5 0 0 0-.145 2.993l.145.007h1.487v3.751a.25.25 0 0 0 .193.244l.057.006h3.749l.001 1.496a1.5 1.5 0 0 0 2.994.145l.006-.144l-.001-1.497h3.751a.25.25 0 0 0 .244-.192l.006-.057V15h-.523l-.18-.006a3.003 3.003 0 0 1-2.79-2.841l-.005-.177l.007-.18a3 3 0 0 1 2.818-2.79l.175-.005h.497L18.5 6.75a.25.25 0 0 0-.13-.22l-.062-.024l-.058-.006l-3.751-.001l.001-1.495a1.5 1.5 0 0 0-1.5-1.5z"
                    fill="currentColor"></path>
                </g>
              </svg>
            </n-icon>
          </template>
          <span>快捷应用</span>
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
      <!--切换全屏-->
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
// import { useScreenLockStore } from '@/store/modules/screenLock';
import ProjectSetting from './ProjectSetting.vue';
import { AsideMenu } from '@/layout/components/Menu';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { websiteConfig } from '@/config/website.config';
import { Alert32Regular, Flash20Regular, ExpandUpRight24Regular, Search32Filled, DividerShort20Filled, ArrowClockwise16Filled, PanelRightContract24Regular, PanelLeftContract24Regular } from '@vicons/fluent'
// import { TranslateOutlined } from '@vicons/material'

export default defineComponent({
  name: 'PageHeader',
  components: { ...components, NDialogProvider, ProjectSetting, AsideMenu },
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
      ArrowClockwise16Filled, PanelRightContract24Regular, PanelLeftContract24Regular, DividerShort20Filled, Flash20Regular
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
