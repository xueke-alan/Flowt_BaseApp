<template>
  <Result :status="status" :title="titleCN" :description="description" :footer-text="footerText">
    <template #emoji>
      <img src="@/components/Twemoji/1f635.svg" alt="1f635">

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

      status: "503",
      title: '503! Service Unavailable',
      titleCN: '503! 服务不可用',

      description: "当前访问的微服务正在进行维护",
      footerText: 'Error Code: C-503-DashBoard',
    };
  },
};
</script>
