<template>
  <Result :status="status" :title="titleCN" :description="description" :footer-text="footerText">
    <template #emoji>
      <img src="@/components/Twemoji/1f9d0.svg" alt="1f9d0" class="pulsate-bck">
    </template>
    <template #button>
      <span></span>
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
      status: "100",
      title: 'Loading...',
      titleCN: '加载中...',
      description: "你所访问的微服务正在加载中...",
      footerText: '',
    };
  },
};
</script>

<style scoped>
.pulsate-bck {
  -webkit-animation: pulsate-bck 0.5s ease-in-out infinite both 1s;
  animation: pulsate-bck 0.5s ease-in-out infinite both 1s;
}

@-webkit-keyframes pulsate-bck {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes pulsate-bck {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  50% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
