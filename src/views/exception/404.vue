<template>
  <Result :status="status" :title="titleCN" :description="description" :emoji="emoji" :footer-text="footerText">
    <template #emoji>

        <img src="@/components/Twemoji/Face_with_Peeking_Eye_Proposal.svg" alt="Face_with_Peeking_Eye_Proposal">

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
      emoji: "🫣",
      status: "404",
      title: '404!  Not Found',
      titleCN: '404! 未找到页面',

      description: "当前访问的微服务未开发或未部署",
      footerText: 'Error Code: C-404-DashBoard',
    };
  },
};
</script>
