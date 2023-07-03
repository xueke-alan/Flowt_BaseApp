<template>
  <n-layout class="layout" :position="fixedMenu" has-sider>
    <n-layout-sider v-if="!isMobile && isMixMenuNoneSub && (navMode === 'vertical' || navMode === 'horizontal-mix')
      " @collapse="collapsed = true" :position="fixedMenu" @expand="collapsed = false" :collapsed="collapsed"
      collapse-mode="width" :collapsed-width="64" :width="leftMenuWidth" :native-scrollbar="false" :inverted="inverted"
      class="layout-sider">
      <Logo :collapsed="collapsed" />

      <div class="AsideMenuScrollbar">
        <AsideMenu v-model:collapsed="collapsed" v-model:location="getMenuLocation" />
      </div>

      <div class="AsideMenuFooter">

        <div class="cover"></div>
        <a class="beian">
          <span>Flowt</span>
          <span class="num" :class="{ hidenum: collapsed }">v1.2.1</span>
        </a>
        <a class="beian" href="https://beian.miit.gov.cn/" target="_blank">
          <span>粤ICP备</span>
          <span class="num" :class="{ hidenum: collapsed }">2023003909号</span>
        </a>



      </div>

    </n-layout-sider>

    <n-drawer v-model:show="showSideDrawer" :width="menuWidth" :placement="'left'" class="layout-side-drawer">
      <Logo :collapsed="collapsed" />
      <div class="AsideMenuScrollbar">
        <AsideMenu @clickMenuItem="collapsed = false" />
      </div>
    </n-drawer>

    <n-layout :inverted="inverted" :content-style="{ overflow: 'hidden' }">
      <n-layout-header :inverted="getHeaderInverted" :position="fixedHeader">
        <PageHeader v-model:collapsed="collapsed" :inverted="inverted" />
      </n-layout-header>

      <n-layout class="layout-content" :content-style="{
        overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
        position: 'relative',
        height: '100%'
      }" :class="{ 'layout-default-background': getDarkTheme === false }">

        <n-watermark content="GZ10548 薛科" cross selectable :font-size="16" :line-height="16" :width="300" :height="300"
          :x-offset="12" :y-offset="100" :rotate="-15">

          <div class="layout-content-main" :class="{
            'layout-content-main-fix': fixedMulti,
            'fluid-header': fixedHeader === 'static',
          }
            ">
            <TabsView v-model:collapsed="collapsed" class="TabViewTabs" :class="{ HideTabViewTabs: !isMultiTabs }" />

            <div class="main-view" :class="{
              'main-view-fix': fixedMulti,
              noMultiTabs: !isMultiTabs,
              'mt-3': !isMultiTabs,
            }
              ">



              <MainView />



              <n-back-top :right="80" :bottom="40" />


            </div>

            <div class="scollCover"></div>
          </div>
        </n-watermark>
      </n-layout>

    </n-layout>
  </n-layout>
</template>

<script lang="ts" setup>
import { ref, unref, computed, onMounted } from 'vue';
import { Logo } from './components/Logo';
import { TabsView } from './components/TagsView';
import { MainView } from './components/Main';
import { AsideMenu } from './components/Menu';
import { PageHeader } from './components/Header';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { useDesignSetting } from '@/hooks/setting/useDesignSetting';
import { useRoute } from 'vue-router';
import { useProjectSettingStore } from '@/store/modules/projectSetting';
// import { useRouter } from "vue-router";

const { getDarkTheme } = useDesignSetting();
const {
  // showFooter,
  navMode,
  navTheme,
  headerSetting,
  menuSetting,
  multiTabsSetting,
} = useProjectSetting();

// const router = useRouter();
// const nowRouter = ref(router.currentRoute)

const settingStore = useProjectSettingStore();

const collapsed = ref<boolean>(false);

const { mobileWidth, menuWidth } = unref(menuSetting);

const isMobile = computed<boolean>({
  get: () => settingStore.getIsMobile,
  set: (val) => settingStore.setIsMobile(val),
});

const fixedHeader = computed(() => {
  const { fixed } = unref(headerSetting);
  return fixed ? 'absolute' : 'static';
});

const isMixMenuNoneSub = computed(() => {
  const mixMenu = unref(menuSetting).mixMenu;
  const currentRoute = useRoute();
  if (unref(navMode) != 'horizontal-mix') return true;
  if (unref(navMode) === 'horizontal-mix' && mixMenu && currentRoute.meta.isRoot) {
    return false;
  }
  return true;
});

const fixedMenu = computed(() => {
  const { fixed } = unref(headerSetting);
  return fixed ? 'absolute' : 'static';
});

const isMultiTabs = computed(() => {
  return unref(multiTabsSetting).show;
});

const fixedMulti = computed(() => {
  return unref(multiTabsSetting).fixed;
});

const inverted = computed(() => {
  return ['dark', 'header-dark'].includes(unref(navTheme));
});

const getHeaderInverted = computed(() => {
  return ['light', 'header-dark'].includes(unref(navTheme)) ? unref(inverted) : !unref(inverted);
});

const leftMenuWidth = computed(() => {
  const { minMenuWidth, menuWidth } = unref(menuSetting);
  return collapsed.value ? minMenuWidth : menuWidth;
});

const getMenuLocation = computed(() => {
  return 'left';
});

// 控制显示或隐藏移动端侧边栏
const showSideDrawer = computed({
  get: () => isMobile.value && collapsed.value,
  set: (val) => (collapsed.value = val),
});

//判断是否触发移动端模式
const checkMobileMode = () => {
  if (document.body.clientWidth <= mobileWidth) {
    isMobile.value = true;
  } else {
    isMobile.value = false;
  }
  collapsed.value = false;
};

const watchWidth = () => {
  const Width = document.body.clientWidth;
  if (Width <= 950) {
    collapsed.value = true;
  } else collapsed.value = false;

  checkMobileMode();
};

onMounted(() => {
  checkMobileMode();
  window.addEventListener('resize', watchWidth);

});
</script>

<style lang="less">
.layout-side-drawer {
  background-color: rgb(0, 20, 40);

  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }
}
</style>
<style lang="less" scoped>
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;

  &-default-background {
    background: #f5f7f9;
  }

  .layout-sider {
    min-height: 100vh;
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    position: relative;
    z-index: 13;
    transition: all 0.2s ease-in-out;
  }

  .AsideMenuFooter {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 84px;
    // background-color: #991111;
    padding-bottom: 5px;
    z-index: 28;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    display: flex;

    padding-bottom: 10px;

    .cover {
      width: calc(100% - 8px);
      height: 20px;
      background: linear-gradient(#ffffff00, rgb(0, 20, 40));
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .beian {

    display: flex;
    opacity: .4;
    justify-content: center;
    font-size: 12px;
    margin-bottom: 5px;
    transition: all .3s var(--n-bezier);
    cursor: pointer;




    &:hover {

      opacity: 1;


    }


    .num {
      max-width: 90px;
      transition: max-width .5s var(--n-bezier) .3s;
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
      margin-left: 5px;

      .short {
        max-width: 20px;

      }


      &.hidenum {
        max-width: 0px;
        transition: max-width .3s ease;

      }
    }
  }

  .layout-sider-fix {
    position: fixed;
    top: 0;
    left: 0;
  }

  .ant-layout {
    overflow: hidden;
  }

  .layout-right-fix {
    overflow-x: hidden;
    padding-left: 200px;
    min-height: 100vh;
    transition: all 0.2s ease-in-out;
  }

  .layout-content {
    flex: auto;
    // min-height: 100vh;
    height: calc(100% - 50px);
    margin-top: 50px;
    // background-color: red;
  }

  .n-layout-header.n-layout-header--absolute-positioned {
    z-index: 11;
  }

  .n-layout-footer {
    background: none;
  }
}

.layout-content-main {
  margin: 0 5px 10px 10px;
  position: relative;
  height: 100%;
  // padding-top: 50px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.layout-content-main-fix {
  // padding-top: 50px;
}

.fluid-header {
  padding-top: 0;
}

.TabViewTabs {
  max-height: 44px;
  height: 44px;
  overflow: hidden;
  transition: all .3s ease;
  opacity: 1;
  pointer-events: all;
  user-select: none;

  // padding: 0;
  // margin: 0;
  &.HideTabViewTabs {
    max-height: 0px;
    padding-top: 0;
    padding-bottom: 0;
    margin: 0;
    opacity: 0;
    pointer-events: none;

  }
}


.main-view {
  height: 100vh;
  padding-right: 6px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 44px;
  position: relative;
  transition: all .3s ease;

  &.noMultiTabs {
    margin-top: 10px;
  }


  /*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: #F5F5F5;
  }

  /*定义滚动条轨道
 内阴影+圆角*/
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #F5F5F5;
  }

  /*定义滑块
 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .13);
    background-color: #57575759;

  }


}


.AsideMenuScrollbar {
  margin-right: 3px;
  user-select: none;
  max-height: calc(100vh - 64px - 64px);
  overflow-y: scroll;
  padding-bottom: 25px;

  /*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: transparent;
  }

  /*定义滚动条轨道
 内阴影+圆角*/
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: transparent;
  }

  /*定义滑块
 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .13);
    background-color: #dddddd88;

  }
}

.noMultiTabs {
  padding-top: 0;
}
</style>