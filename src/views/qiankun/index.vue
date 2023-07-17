<template></template>

<script setup>
import { start, loadMicroApp } from 'qiankun';
import { onMounted } from 'vue';

onMounted(() => {
  // if (!window.qiankunStarted) {
  //   window.qiankunStarted = true;
  //   console.log(window.qiankunStarted);
  //   setTimeout(() => {

  //     start();
  //   }, 2500);
  // }
  setTimeout(() => {
    start();
  }, 3000);
  // TODO 页面离开前，卸载微应用，解决single-spa minified message #1的报错
  // start();
});
</script>
