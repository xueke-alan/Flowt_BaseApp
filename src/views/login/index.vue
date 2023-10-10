<template>
  <div class="loginPage">
    <div class="background">
      <div class="left"></div>
      <div class="right">
        <div class="bg"></div>
      </div>
    </div>

    <div class="mainView">
      <div class="left">
        <login />
        <n-space class="copyright">
          <a>2023 Copyright</a>
          <a>Our Police</a>
          <a>备案 20220913</a>
        </n-space>

      </div>
      <div class="right"></div>
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
    opacity: 1;
    transition: all .3s ease;

    .left {
      background-image: url(@/assets/images/login.svg);
      flex: 1;
    }

    .right {
      background-color: transparent;
      width: calc(calc(100vw / 2.5) + 10%);
      overflow: hidden;
      transition: all .3s ease;

      .bg {
        background: url(https://sgs.gzmr.team/static/img/sgsBG.c1f9a0aa.jpg);
        background-position: center;
        width: 100%;
        height: 100%;
        filter: blur(20px);
        overflow: hidden;
        transform: scale(1.1);
        background-size: cover
      }
    }
  }

  .mainView {
    width: 80%;
    height: 80%;
    transition: all .3s ease;
    background-color: rgb(250, 250, 250);
    z-index: 5;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    display: flex;
    overflow: hidden;

    .left {
      background-color: rgb(248, 250, 250);
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      position: relative;

      .copyright {
        font-size: 14px;
        color: #aaa;
        // position: absolute;
        // bottom: 30px;
        margin-bottom: 30px;
      }
    }

    .right {
      // background-color: rgba(1, 1, 70, 0.425);
      background: url(https://sgs.gzmr.team/static/img/sgsBG.c1f9a0aa.jpg);
      width: calc(100vw / 2.5);
      background-position: center;
      background-size: cover;
      transition: all .3s ease;
      filter: blur(0px);
    }
  }

  @media screen and (max-width: 1200px) {


    .background,
    .mainView {
      .right {
        width: 0;
      }
    }
  }

  @media screen and (max-height: 750px) {
    .mainView {
      width: 100%;
      height: 100%;
    }

    .background {
      opacity: 0;
    }
  }

}
</style>
