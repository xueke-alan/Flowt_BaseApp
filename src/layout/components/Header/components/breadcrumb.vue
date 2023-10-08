<template>
  <n-breadcrumb v-if="crumbsSetting.show" class="base-breadcrumb">
    <template v-for="routeItem in breadcrumbList" :key="routeItem.key === 'Redirect' ? void 0 : routeItem.name">
      <n-dropdown placement="bottom" :options="routeItem.option" @select="dropdownSelect" trigger="click">
        <n-breadcrumb-item>
          <span class="link-text">
            <component v-if="crumbsSetting.showIcon && routeItem.icon" :is="routeItem.icon" />
            {{ routeItem.label }}
          </span>
        </n-breadcrumb-item>
      </n-dropdown>
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

  const matched = generator(route.matched)

  const list = matched.map((r) => {
    return {
      label: r.meta.title,
      key: r.name,
      icon: r.meta.icon,
      option: r.children.map((c) => {
        return {
          label: c.meta.title,
          key: c.name,
          icon: c.meta.icon,
        }
      })
    }
  })
  return list
});


// 下拉选择器点击事件
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
