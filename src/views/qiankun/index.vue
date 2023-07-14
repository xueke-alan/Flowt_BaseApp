<template>
  <!-- <div id="main-view-qiankun"></div> -->
</template>

<script setup>
import { start, loadMicroApp } from 'qiankun';
import { onMounted } from 'vue';

onMounted(() => {
  console.log("TEST1mounted");
  console.log(window.qiankunStarted);
  if (!window.qiankunStarted) {
    window.qiankunStarted = true;
    console.log(window.qiankunStarted);

    setTimeout(() => {
      console.log(123);
      start();
    }, 300);
  }
  setTimeout(() => {
    console.log(1234);
    console.log(document.querySelector("#main-view-qiankun"));
    start();
  }, 300);
});
</script>
