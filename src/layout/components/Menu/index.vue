<template>
  <div class="NMenu" :class="{ NMenuCollapsed: collapsed }">


    <NMenu v-if="menus[0]" :options="menus[0].menus" :inverted="inverted" :mode="mode" :collapsed="collapsed"
      :collapsed-width="64" :collapsed-icon-size="20" :root-indent="24" :indent="12" :expanded-keys="openKeys"
      :expand-icon="expandIcon" :value="getSelectedKeys" @update:value="clickMenuItem"
      @update:expanded-keys="menuExpanded" class="mainRouter" />


    <n-collapse arrow-placement="right" style="border: 0;" :expanded-names="expandedNames"
      :on-item-header-click="onItemHeaderClick">
      <template #arrow> <span></span> </template>
      <n-collapse-item v-for="(m) in menus.slice(1)" :name="m.group" style="border: 0;overflow: hidden;cursor: default;">
        <template #header>
          <div class="collapse-item-header-slot">
            <n-divider class="n-divider" :class="{ dark: getDarkTheme }" />
            <div class="groupTitle" :class="{ cur: selectedRouterGroup == m.group }"
              v-if="m.group !== 'main' && !collapsed">
              <span class="leftTitle">
                <n-icon size="16">
                  <component :is="ChannelShare28Regular" />
                </n-icon>
                <span style="text-wrap: nowrap;">{{ m.group || "其他" }}</span>
              </span>
              <n-icon size="16" class="arrow" :class="{ exp: expandedNames.indexOf(m.group) > 0 }">
                <component :is="ArrowEject20Filled" />
              </n-icon>
            </div>
          </div>
        </template>

        <!-- 调试代码可以使用 :dropdown-props="{ trigger: 'click' }" -->
        <NMenu   :options="m.menus" :inverted="inverted" :mode="mode" :collapsed="collapsed" :collapsed-width="64"
          :collapsed-icon-size="20" :root-indent="24" :indent="12" :expanded-keys="openKeys" :value="getSelectedKeys"
          @update:value="clickMenuItem" @update:expanded-keys="menuExpanded" :expand-icon="expandIcon" />
      </n-collapse-item>

    </n-collapse>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, computed, watch, toRefs, unref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAsyncRouteStore } from '@/store/modules/asyncRoute';
import { generatorMenu, generatorMenuMix, groupMenu } from '@/utils';
import { useProjectSettingStore } from '@/store/modules/projectSetting';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { ArrowEject20Filled, ChannelShare28Regular } from '@vicons/fluent';
import { CaretDown20Filled } from '@vicons/fluent';
import { renderIcon } from '@/utils/index';
import { queuePostFlushCb } from 'vue';
import { useDesignSetting } from '@/hooks/setting/useDesignSetting';

export default defineComponent({
  name: 'AppMenu',
  components: {},
  props: {
    mode: {
      // 菜单模式
      type: String,
      default: 'vertical',
    },
    collapsed: {
      // 侧边栏菜单是否收起
      type: Boolean,
    },
    //位置
    location: {
      type: String,
      default: 'left',
    },
  },
  emits: ['update:collapsed', 'clickMenuItem'],
  setup(props, { emit }) {
    // 当前路由
    const currentRoute = useRoute();
    const router = useRouter();
    const asyncRouteStore = useAsyncRouteStore();
    const settingStore = useProjectSettingStore();
    const menus = ref<any[]>([]);
    const expandedNames = ref<any[]>([]);
    const selectedKeys = ref<string>(currentRoute.name as string);
    const headerMenuSelectKey = ref<string>('');

    const { navMode } = useProjectSetting();

    // 获取当前打开的子菜单
    const matched = currentRoute.matched;

    const getOpenKeys = matched && matched.length ? matched.map((item) => item.name) : [];

    const state = reactive({
      openKeys: getOpenKeys,
    });

    const inverted = computed(() => {
      return ['dark', 'header-dark'].includes(settingStore.navTheme);
    });

    const getSelectedKeys = computed(() => {
      let location = props.location;
      return location === 'left' || (location === 'header' && unref(navMode) === 'horizontal')
        ? unref(selectedKeys)
        : unref(headerMenuSelectKey);
    });

    const selectedRouterGroup = computed(() => {
      return currentRoute.meta.group
    });

    const { getDarkTheme } = useDesignSetting();


    // 监听分割菜单
    watch(
      () => settingStore.menuSetting.mixMenu,
      () => {
        updateMenu();
        if (props.collapsed) {
          emit('update:collapsed', !props.collapsed);
        }
      }
    );

    // 监听菜单收缩状态
    watch(
      () => props.collapsed,
      () => {
        if (props.collapsed) {
          // 关闭的时候，将分组全部展开
          expandedNames.value = menus.value.map((m) => m.group)
        }
        // 滚动列表，使选中的路由始终再视窗内，需要延迟，因为分组标签还包含了高度
        setTimeout(() => {
          scrollMenu()
        }, 400);
      }
    );

    // 跟随页面路由变化，切换菜单选中状态
    watch(
      () => currentRoute.fullPath,
      () => {
        updateMenu();
      }
    );

    function updateSelectedKeys() {
      const matched = currentRoute.matched;
      state.openKeys = matched.map((item) => item.name);
      const activeMenu: string = (currentRoute.meta?.activeMenu as string) || '';
      selectedKeys.value = activeMenu ? (activeMenu as string) : (currentRoute.name as string);
    }


    function scrollMenu() {
      const asideMenuScrollbar = document.querySelector('.AsideMenuScrollbar') as HTMLElement;
      const selectedElement = asideMenuScrollbar.querySelector('.n-menu-item-content--selected') as HTMLElement;

      if (selectedElement) {
        const selectedRect = selectedElement.getBoundingClientRect();
        const scrollbarRect = asideMenuScrollbar.getBoundingClientRect();

        const offsetY = selectedRect.top - scrollbarRect.top;
        const scrollAmount = asideMenuScrollbar.scrollTop;
        const elementHeight = asideMenuScrollbar.offsetHeight;
        const selectedElementHeight = selectedElement.clientHeight;

        const scrollIfNeeded = (distance: number) => {
          const targetScroll = Math.max(0, scrollAmount + distance);
          asideMenuScrollbar.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        };

        const margin = 20; // 渐变块的高度
        const offset = 80; // 希望上面和下面富余的部分

        if (offsetY < 0) {
          scrollIfNeeded(offsetY - offset);
        } else if (offsetY > elementHeight - selectedElementHeight - margin) {
          scrollIfNeeded(offsetY - (elementHeight - selectedElementHeight - margin) + offset);
        }
      }
    }


    function updateMenu() {

      if (!settingStore.menuSetting.mixMenu) {
        const temp = generatorMenu(asyncRouteStore.getMenus)
        menus.value = temp;
      } else {
        //混合菜单
        const firstRouteName: string = (currentRoute.matched[0].name as string) || '';
        menus.value = generatorMenuMix(asyncRouteStore.getMenus, firstRouteName, props.location);
        const activeMenu: string = currentRoute?.matched[0].meta?.activeMenu as string;
        headerMenuSelectKey.value = (activeMenu ? activeMenu : firstRouteName) || '';
      }

      const sort = asyncRouteStore.sortedGroupList
      menus.value = groupMenu(menus.value, sort)
      updateSelectedKeys();



      // 检查分组的group是否是关闭的。
      const groupNameNow = currentRoute.meta.group

      if (!expandedNames.value.includes(groupNameNow)) {
        expandedNames.value.push(groupNameNow); // 添加字符串"a"
      }


      // 滚动列表，使选中的路由始终再视窗内
      queuePostFlushCb(() => { scrollMenu() });
    }

    // TODO 高亮当前路由分组
    // 点击分组菜单
    function onItemHeaderClick({ name }) {
      if (props.collapsed) {
        return
      }
      if (expandedNames.value.includes(name)) {
        const index = expandedNames.value.indexOf(name);
        expandedNames.value.splice(index, 1); // 删除字符串"a"
      } else {
        expandedNames.value.push(name); // 添加字符串"a"
      }

      // 滚动列表，使选中的路由始终再视窗内
      queuePostFlushCb(() => { scrollMenu() });
    }

    // 点击菜单
    function clickMenuItem(key: string) {
      if (/http(s)?:/.test(key)) {
        window.open(key);
      } else {
        router.push({ name: key });
      }
      emit('clickMenuItem' as any, key);
    }

    //展开菜单
    function menuExpanded(openKeys: string[]) {
      if (!openKeys) return;
      const latestOpenKey = openKeys.find((key) => state.openKeys.indexOf(key) === -1);
      const isExistChildren = findChildrenLen(latestOpenKey as string);
      state.openKeys = isExistChildren ? (latestOpenKey ? [latestOpenKey] : []) : openKeys;
    }

    //查找是否存在子路由
    function findChildrenLen(key: string) {
      if (!key) return false;
      const subRouteChildren: string[] = [];
      for (const { children, key } of unref(menus)) {
        if (children && children.length) {
          subRouteChildren.push(key as string);
        }
      }
      return subRouteChildren.includes(key);
    }

    onMounted(() => {
      updateMenu();
      expandedNames.value = menus.value.map((m) => m.group)
    });
    const expandIcon = renderIcon(CaretDown20Filled)


    return {
      ...toRefs(state),
      inverted,
      menus,
      selectedKeys,
      headerMenuSelectKey,
      getSelectedKeys,
      clickMenuItem,
      expandedNames,
      menuExpanded,
      onItemHeaderClick,
      ArrowEject20Filled,
      ChannelShare28Regular,
      expandIcon,
      selectedRouterGroup,
      getDarkTheme
    };
  },
});
</script>

<style lang="less">
.NMenu {
  .n-collapse .n-collapse-item .n-collapse-item__content-wrapper .n-collapse-item__content-inner {
    padding-top: 0;
  }

  .n-collapse .n-collapse-item .n-collapse-item__header {
    transition: all .3s ease;
    padding-top: 0;

  }

  .n-menu .n-menu-item-content::before {
    right: 3px;
    transition: all .3s ease;
  }

  &.NMenuCollapsed {
    .n-collapse .n-collapse-item .n-collapse-item__header {
      padding-top: 0;
    }

    .n-menu .n-menu-item-content::before {
      right: 0px;
    }
  }

  .n-menu .n-menu-item-content .n-menu-item-content-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 2px;

    .n-menu-item-content-header__extra {
      display: flex;
      align-items: center;
      color: #ffffff;
    }
  }

  .n-menu-item-content--hover.n-menu-item-content--child-active::before,
  .n-menu-item-content--collapsed.n-menu-item-content--child-active::before {
    background-color: var(--n-item-color-active) !important;
    transition: all .3s ease .2s;
  }
}


.v-binder-follower-content .n-dropdown-menu .n-dropdown-option {

  &:not(:last-child) {
    margin-bottom: 4px;
  }

  // TODO 这里的弹窗不能如此定义，会影响全局

  .n-dropdown-option-body:not(.n-dropdown-option-body--disabled):not(.n-dropdown-option-body--active).n-dropdown-option-body--pending::before {
    background-color: #aaaaaa30
  }
}
</style>


<style scoped lang="less">
.NMenu {


  &.NMenuCollapsed {
    .groupTitle {

      padding: 0 !important;

    }

    .n-collapse .n-collapse-item {
      margin: 0;
    }

    .collapse-item-header-slot {

      height: 8px !important;

      // .n-divider {
      //   margin: 3px 0 5px 0;
      //   padding: 0 5px 0 18px;
      //   opacity: 1;

      // }
    }

    .mainRouter {
      margin-bottom: 0px;
    }
  }


}

.mainRouter {
  margin-bottom: 20px;
  transition: all .3s var(--n-bezier);

}

.collapse-item-header-slot {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 32px;
  transition: .3s var(--n-bezier) all;

  .n-divider {
    margin: 3px 0 5px 0;
    padding: 0 10px 0 18px;
    opacity: .2;
    transition: .3s ease all 0s;

    &.dark {
      opacity: 1;
      transition: .3s ease all .3s;

    }
  }
}

.groupTitle {
  font-size: 12px;
  opacity: .4;
  padding: 0 14px 0 25px;
  color: aliceblue;
  transition: all .3s var(--n-bezier);
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.cur {
    opacity: .8;

  }

  .leftTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      margin-left: 5px;
    }
  }

  .arrow {
    margin-right: 0;
    transform: rotate(90deg);
    transition: all .3s var(--n-bezier);

    &.exp {
      transform: rotate(180deg);

    }
  }

  &:hover {
    opacity: .8;
  }
}
</style>