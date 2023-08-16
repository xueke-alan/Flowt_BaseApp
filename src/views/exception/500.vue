<template>
  <Result :status="status" :title="titleCN" :description="description" :emoji="emoji" :footer-text="footerText">
    <template #emoji>

      <img src="@/components/Twemoji/1f92f.svg" alt="1f92f">

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
      emoji: "🤯",
      emojiUnicode: 'null',
      status: "500",
      title: '500! Internal Server Error',
      titleCN: '500! 服务器内部错误',
      description: "当前访问的微服务出现异常",
      footerText: 'Error Code: C-500-DashBoard',
    };
  },
  mounted() {
    if (this.emoji) {
      this.emojiUnicode = this.emoji.codePointAt(0)?.toString(16) || '';
    }
  },
};
</script>
