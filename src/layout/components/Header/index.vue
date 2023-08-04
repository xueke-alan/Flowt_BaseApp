<!-- TODO 拆分本文件 -->

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
      <!-- <div class="layout-header-trigger layout-header-trigger-min" v-if="headerSetting.isReload" @click="reloadPage">
        <n-icon size="20">

          <component :is="ArrowClockwise16Filled" />

        </n-icon>
      </div> -->
      <n-icon size="24" class="mr-1" style="pointer-events: none; opacity: .3;">
        <component :is="DividerShort20Filled" />
      </n-icon>
      <!-- <n-divider vertical /> -->

      <!-- 面包屑 -->

      <n-breadcrumb v-if="crumbsSetting.show">
        <template v-for="(routeItem, index) in breadcrumbList"
          :key="routeItem.name === 'Redirect' ? void 0 : routeItem.name">
          <n-breadcrumb-item
            v-if="routeItem.meta.title && !routeItem.meta.hideBreadcrumb && (index == breadcrumbList.length - 1 || routeItemChildren(routeItem.children).length > 1)">
            <n-dropdown v-if="routeItem.children.length"
              :options="routeItemChildren(routeItem.children).length > 1 ? routeItemChildren(routeItem.children) : []"
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
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="20" @click="chatgpt">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                <path
                  d="M 14.070312 2 C 11.330615 2 8.9844456 3.7162572 8.0390625 6.1269531 C 6.061324 6.3911222 4.2941948 7.5446684 3.2773438 9.3066406 C 1.9078196 11.678948 2.2198602 14.567816 3.8339844 16.591797 C 3.0745422 18.436097 3.1891418 20.543674 4.2050781 22.304688 C 5.5751778 24.677992 8.2359331 25.852135 10.796875 25.464844 C 12.014412 27.045167 13.895916 28 15.929688 28 C 18.669385 28 21.015554 26.283743 21.960938 23.873047 C 23.938676 23.608878 25.705805 22.455332 26.722656 20.693359 C 28.09218 18.321052 27.78014 15.432184 26.166016 13.408203 C 26.925458 11.563903 26.810858 9.4563257 25.794922 7.6953125 C 24.424822 5.3220082 21.764067 4.1478652 19.203125 4.5351562 C 17.985588 2.9548328 16.104084 2 14.070312 2 z M 14.070312 4 C 15.226446 4 16.310639 4.4546405 17.130859 5.2265625 C 17.068225 5.2600447 17.003357 5.2865019 16.941406 5.3222656 L 12.501953 7.8867188 C 12.039953 8.1527187 11.753953 8.6456875 11.751953 9.1796875 L 11.724609 15.146484 L 9.5898438 13.900391 L 9.5898438 8.4804688 C 9.5898438 6.0104687 11.600312 4 14.070312 4 z M 20.492188 6.4667969 C 21.927441 6.5689063 23.290625 7.3584375 24.0625 8.6953125 C 24.640485 9.696213 24.789458 10.862812 24.53125 11.958984 C 24.470201 11.920997 24.414287 11.878008 24.351562 11.841797 L 19.910156 9.2773438 C 19.448156 9.0113437 18.879016 9.0103906 18.416016 9.2753906 L 13.236328 12.236328 L 13.248047 9.765625 L 17.941406 7.0546875 C 18.743531 6.5915625 19.631035 6.4055313 20.492188 6.4667969 z M 7.5996094 8.2675781 C 7.5972783 8.3387539 7.5898438 8.4087418 7.5898438 8.4804688 L 7.5898438 13.607422 C 7.5898438 14.141422 7.8729844 14.635297 8.3339844 14.904297 L 13.488281 17.910156 L 11.34375 19.134766 L 6.6484375 16.425781 C 4.5094375 15.190781 3.7747656 12.443687 5.0097656 10.304688 C 5.5874162 9.3043657 6.522013 8.5923015 7.5996094 8.2675781 z M 18.65625 10.865234 L 23.351562 13.574219 C 25.490562 14.809219 26.225234 17.556313 24.990234 19.695312 C 24.412584 20.695634 23.477987 21.407698 22.400391 21.732422 C 22.402722 21.661246 22.410156 21.591258 22.410156 21.519531 L 22.410156 16.392578 C 22.410156 15.858578 22.127016 15.364703 21.666016 15.095703 L 16.511719 12.089844 L 18.65625 10.865234 z M 15.009766 12.947266 L 16.78125 13.980469 L 16.771484 16.035156 L 14.990234 17.052734 L 13.21875 16.017578 L 13.228516 13.964844 L 15.009766 12.947266 z M 18.275391 14.853516 L 20.410156 16.099609 L 20.410156 21.519531 C 20.410156 23.989531 18.399687 26 15.929688 26 C 14.773554 26 13.689361 25.54536 12.869141 24.773438 C 12.931775 24.739955 12.996643 24.713498 13.058594 24.677734 L 17.498047 22.113281 C 17.960047 21.847281 18.246047 21.354312 18.248047 20.820312 L 18.275391 14.853516 z M 16.763672 17.763672 L 16.751953 20.234375 L 12.058594 22.945312 C 9.9195938 24.180312 7.1725 23.443687 5.9375 21.304688 C 5.3595152 20.303787 5.2105423 19.137188 5.46875 18.041016 C 5.5297994 18.079003 5.5857129 18.121992 5.6484375 18.158203 L 10.089844 20.722656 C 10.551844 20.988656 11.120984 20.989609 11.583984 20.724609 L 16.763672 17.763672 z">
                </path>
              </svg>
            </n-icon>
          </template>
          <span>ChatGPT</span>
        </n-tooltip>
      </div>
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
            <n-avatar :size="20"
              :src="avatar"
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
import { defineComponent, reactive, toRefs, ref, computed, unref, onMounted } from 'vue';
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

    const { avatar, Username } = userStore?.info || {};

    const drawerSetting = ref();

    const state = reactive({
      username: Username ?? '',
      avatar: avatar ?? '',
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
    // const reloadPage = () => {
    //   router.push({
    //     path: '/redirect' + unref(route).fullPath,
    //   });
    // };

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
            // .finally(() => location.reload());
            // 这里要重置账号密码吗，没有搞懂意义

          });
        },
        onNegativeClick: () => { },
      });
    };

    // 切换全屏图标
    const toggleFullscreenIcon = () => (
      state.fullscreenIcon =
      document.fullscreenElement !== null ? 'FullscreenExitOutlined' : 'FullscreenOutlined');

    const chatgpt = () => {
      router.push({ name: 'chat' });
    }
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
          router.push({ name: 'personal' });
          break;
        case 2:
          doLogout();
          break;
      }
    };

    function openSetting() {
      // const { openDrawer } = drawerSetting.value;
      // openDrawer();
      router.push({ name: 'setting' });
    }

    function searchFocus(params) {
      console.log(params);

    }

    onMounted(() => {
      const imgElement = document.querySelector('.layout-header-trigger .avatar img') as HTMLImageElement;
      if (imgElement) { imgElement.alt = 'User avatar'; }
    });

    return {
      ...toRefs(state),
      iconList,
      toggleFullScreen,
      chatgpt,
      doLogout,
      route,
      dropdownSelect,
      avatarOptions,
      getChangeStyle,
      avatarSelect,
      breadcrumbList,
      // reloadPage,
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
