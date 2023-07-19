<template>
  <div class="logo">
    <div class="logo-box">
      <img :src="websiteConfig.logo" alt="" />
      <div class="title" :class="{ 'collapsed': collapsed }">Flowt</div>
    </div>

  </div>
</template>

<script lang="ts">
import { websiteConfig } from '@/config/website.config';
export default {
  name: 'Index',
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  data() {
    return {
      websiteConfig,
    };
  },
};
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;

  .logo-box {
    width: 100%;
    // height: 24px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    // width: 64px;
    height: 32px;
    transition: all .3s var(--n-bezier);
  }

  .title {
    // margin-left: 15px;
    margin-left: 15px;
    font-size: 18px;
    font-weight: bold;
    font-style: italic;
    // overflow: hidden;
    opacity: 1;
    transition: max-width .5s var(--n-bezier) .3s, opacity .5s var(--n-bezier) .3s, margin-left .5s var(--n-bezier) .3s;
    user-select: none;
    color: #ddd;
    border-bottom: 1px solid #f60;

    max-width: 70px;
    // overflow: hidden;


  }

  .collapsed {
    &.title {
      margin-left: 0px;
      transition: max-width .3s var(--n-bezier), opacity .3s var(--n-bezier), margin-left .3s var(--n-bezier);


      max-width: 0px;

      opacity: 0;
    }


  }
}
</style>
