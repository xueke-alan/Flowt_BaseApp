<template>
  <n-breadcrumb v-if="crumbsSetting.show" class="base-breadcrumb">
    <template
      v-for="routeItem in breadcrumbList"
      :key="routeItem.name === 'Redirect' ? void 0 : routeItem.name"
    >
      <n-breadcrumb-item v-if="routeItem.children.length != 1">
        <n-dropdown
          v-if="routeItem.children.length"
          :options="
            routeItemChildren(routeItem.children).length >= 1
              ? routeItemChildren(routeItem.children)
              : []
          "
          @select="dropdownSelect"
        >
          <span class="link-text">
            <component
              v-if="crumbsSetting.showIcon && routeItem.meta.icon"
              :is="routeItem.meta.icon"
            />
            {{ routeItem.meta.title }}
          </span>
        </n-dropdown>

        <span class="link-text" v-else>
          <component
            v-if="crumbsSetting.showIcon && routeItem.meta.icon"
            :is="routeItem.meta.icon"
          />
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
    console.log(generator(route.matched));

    return generator(route.matched);
  });

  const routeItemChildren = (children) => {
    children.forEach((i) => {
      // i.disabled = i.name == router.currentRoute.value.name;
      i.icon = i.meta.icon;
    });

    const temp = children.filter((i) => {
      // return i.name != router.currentRoute.value.name
      // 有可能子孙路由跳转
      return i;
    });
    return temp;
  };
  const dropdownSelect = (key) => {
    if (router.currentRoute.value.name == key) {
      return;
    }
    router.push({ name: key });
  };
</script>

<style lang="less" scoped>
  .base-breadcrumb {
    user-select: none;
  }
</style>
