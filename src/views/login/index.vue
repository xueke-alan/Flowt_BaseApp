<template>
  <div class="loginPage">
    <div class="background">
      <div class="left">
        left
      </div>
      <div class="right">
        right
      </div>
    </div>

    <div class="mainView">
      <div class="left">
        <login />
        <span class="copyright">2023 Copyright | Our Police | 备案 20220913</span>
      </div>
      <div class="right">
        right
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import login from "./login.vue";
</script>

<style lang="less" scoped>
.loginPage {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .background {
    position: absolute;
    background-color: rgb(250, 250, 250);
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;

    .left {
      background-color: rgb(250, 250, 250);
      flex: 1;
    }

    .right {
      background-color: rgba(1, 1, 70, 0.425);
      width: calc(700px + 10%);
    }
  }

  .mainView {
    width: 80%;
    height: 80%;
    background-color: rgb(250, 250, 250);
    z-index: 5;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    display: flex;
    overflow: hidden;

    .left {
      background-color: rgb(250, 250, 250);
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: relative;

      .copyright {
        font-size: 14px;
        color: #aaa;
        position: absolute;
        bottom: 30px;
      }
    }

    .right {
      background-color: rgba(1, 1, 70, 0.425);
      width: 700px;
    }
  }
}
</style>
