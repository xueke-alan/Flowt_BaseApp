<template>
  <n-breadcrumb v-if="crumbsSetting.show">
    <template v-for="(routeItem, index) in breadcrumbList" :key="routeItem.name === 'Redirect' ? void 0 : routeItem.name">
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
</template>

<script lang="ts" setup>
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
import { computed } from 'vue';

const { crumbsSetting } = useProjectSetting();
import { useRouter, useRoute } from 'vue-router';



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
  console.log(router);

  return generator(route.matched);
});

const routeItemChildren = (children) => {
  children.forEach((i) => { i.icon = i.meta.icon })
  return children
};
const dropdownSelect = (key) => {
  router.push({ name: key });
};
</script>

<style lang="less" scoped></style>