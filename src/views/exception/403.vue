<template>
  <Result :status="status" :title="titleCN" :description="description" :footer-text="footerText">
    <template #emoji>

      <img src="@/components/Twemoji/270b.svg" alt="270b">

    </template>
  </Result>
</template>

<script lang="ts">
import Result from './index.vue';

export default {
  components: {
    Result,
  },
  data() {
    return {
      status: "403",
      title: '403! Forbidden',
      titleCN: '403! 禁止访问',
      description: "当前没有权限访问此微服务",
      footerText: 'Error Code: C-404-DashBoard',
    };
  },
};
</script>
