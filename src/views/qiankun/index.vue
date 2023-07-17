<template></template>

<script setup>
import { start, loadMicroApp } from 'qiankun';
import { onMounted } from 'vue';

onMounted(() => {
  // if (!window.qiankunStarted) {
  //   window.qiankunStarted = true;
  //   console.log(window.qiankunStarted);

  //   setTimeout(() => {
  //     console.log(123);
  //     start();
  //   }, 300);
  // }
  // setTimeout(() => {
  //   console.log(1234);

  //   console.log(document.querySelector("#main-view-qiankun"));
  //   start();
  // }, 300);
  // TODO 页面离开前，卸载微应用，解决single-spa minified message #1的报错
  start();
});
</script>
