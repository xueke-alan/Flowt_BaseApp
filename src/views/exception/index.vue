<template>
  <div class="page-container">
    <n-result class="result " :status="status" :title="title" :description="description">
      <template #icon>
        <n-icon size="100" class=" wobble-hor-bottom icon">
          <slot name="emoji"></slot>
        </n-icon>
      </template>
      <template #footer>
        <slot name="button" v-if="!inBaseUrl">
          <n-button round strong secondary type="primary" @click="goHome">返回主页</n-button>
        </slot>
        <slot name="button" v-else>
          <n-button round strong secondary @click="refreshPage">刷新页面</n-button>
        </slot>

      </template>
    </n-result>

    <span class="footer">{{ footerText }}</span>

  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum';
import { ref } from 'vue';
import router from '@/router';

const BASE_HOME = PageEnum.BASE_HOME;

const inBaseUrl = ref(false)

function isCurrentRouteBasePage(): boolean {
  const { fullPath } = useRouter().currentRoute.value;
  return fullPath.startsWith(BASE_HOME);
}

if (isCurrentRouteBasePage()) {
  console.log('已经在 base 页面');
  inBaseUrl.value = true
}


// 查看是否已经是主页，如果是，不传入返回主页

// 接收参数
defineProps({
  emoji: {
    type: String,
    default: '-',
  },
  status: {
    type: String,
    default: '404',
  },
  title: {
    type: String,
    default: '404! NOT FOUND',
  },
  description: {
    type: String,
    default: '资源不存在可能说明当前访问的服务服务地址出错，请联系管理员',
  },
  footerText: {
    type: String,
    default: '错误代码：A001 entry:http://127.0.0.1',
  },
});


function goHome() {
  router.push('/');
}

// TODO 写出刷新页面方法，调用页面级刷新还是组件级别刷新？
function refreshPage() {
  router.push('/');
}
</script>


<style lang="less" scoped>
.page-container {
  width: 100%;
  border-radius: 4px;
  padding: 50px 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  user-select: none;
  /* 禁止选择文本 */

  .result {
    margin-bottom: 100px;
    font-family: Arial, Helvetica, sans-serif;

    .icon {
      pointer-events: none;
    }
  }

  .footer {
    opacity: .3;
    user-select: none;
    position: absolute;
    bottom: 10px;
  }
}



.wobble-hor-bottom {
  animation: wobble-hor-bottom .8s both .25s
}


@keyframes wobble-hor-bottom {

  0%,
  100% {
    transform: translateX(0);
    transform-origin: 50% 50%
  }

  15% {
    transform: translateX(-30px) rotate(-6deg)
  }

  30% {
    transform: translateX(15px) rotate(6deg)
  }

  45% {
    transform: translateX(-15px) rotate(-3.6deg)
  }

  60% {
    transform: translateX(9px) rotate(2.4deg)
  }

  75% {
    transform: translateX(-6px) rotate(-1.2deg)
  }
}
</style>
