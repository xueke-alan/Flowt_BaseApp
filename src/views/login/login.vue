<template>
  <div class="formCon">
    <div class="title">
      <div class="sysName">
        <span class="highLine">Flowt.</span>
        <span class="noraml">
          LIMS

        </span>

      </div>
      <!-- <div class="pageName">Login .</div> -->
    </div>

    <n-form ref="formRef" :model="model" :rules="rules" class="loginForm">
      <n-form-item path="username" label="账号">
        <n-input size="large" v-model:value="model.username" @keydown.enter.prevent>
          <template #suffix>
            <n-icon :size="20" :component="Person24Regular" />
          </template>
        </n-input>
      </n-form-item>
      <transition name="slide-up" mode="out-in">
        <n-form-item path="password" label="密码" v-if="pagename == 'login'">
          <n-input size="large" v-model:value="model.password" type="password" @keydown.enter.prevent
            show-password-on="mousedown">
            <template #password-invisible-icon>
              <n-icon :size="20" :component="EyeOff24Regular" />
            </template>
            <template #password-visible-icon>
              <n-icon :size="20" :component="Eye24Filled" />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="captcha" label="验证码" v-else>
          <n-input-group>
            <n-input-group-label size="large">
              <div class="captchaPrefix">
                <div>HW</div>
                <div style="font-size: 20px;line-height: 36px;margin-left: 2px;">-</div>
              </div>
            </n-input-group-label>
            <n-input size="large" ref="captchaInputRef" v-model:value="model.captcha" @keydown.enter.prevent>
            </n-input>
            <n-button size="large" @click="sendCaptcha" class='captchaBtn' :class="{ forbid: waitCaptcha > 0 }">
              <transition name="fade" mode="out-in">
                <div v-if="waitCaptcha">
                  <span style="margin-right: 5px;">已发送</span>
                  <span class="waitCaptcha">
                    <transition name="slide-up" mode="out-in">
                      <span class="waitCaptcha" :key="waitCaptcha">{{ waitCaptcha }}</span>
                    </transition>
                  </span>

                </div>
                <div v-else>
                  <span>发送验证码</span>
                </div>
              </transition>
            </n-button>
          </n-input-group>
        </n-form-item>
      </transition>
      <div>
        <n-button size="large" block :disabled="submitBtnDisable" type="primary" @click="handleValidateButtonClick">
          <transition name="fade" mode="out-in">
            <span v-if="pagename == 'login'">登录</span>
            <span v-else>重置密码</span>
          </transition>
        </n-button>

        <n-divider />
        <n-space justify="space-between">
          <n-space justify="space-between">
            <n-button type="primary" secondary size="small">IP 登录</n-button>
            <n-button strong secondary size="small">访客登录</n-button>
          </n-space>
          <n-button strong secondary size="small" @click="switchPageName">
            <transition name="fade" mode="out-in">
              <span v-if="pagename == 'login'">忘记密码</span>
              <span v-else>账密登录</span>
            </transition>
          </n-button>
        </n-space>
      </div>
    </n-form>
  </div>
</template>
  
<script lang="ts" setup>
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import {
  FormInst,
  FormItemInst,
  FormItemRule,
  useMessage,
  FormRules,
  InputInst,
} from 'naive-ui'
import { useUserStore } from '@/store/modules/user';
import { ResultEnum } from '@/enums/httpEnum';
import { PageEnum } from '@/enums/pageEnum';
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { EyeOff24Regular, Person24Regular, Eye24Filled, Diversity24Regular } from "@vicons/fluent";
const userStore = useUserStore();
interface ModelType {
  username: string | null
  password: string | null
  captcha: string | null
}
const pagename = ref('login')

const router = useRouter();
const route = useRoute();
console.log(route);
const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const message = useMessage()
const modelRef = ref<ModelType>({
  username: null,
  password: null,
  captcha: null
})
function validatePasswordStartWith(
  rule: FormItemRule,
  value: string
): boolean {
  return (
    !!modelRef.value.password &&
    modelRef.value.password.startsWith(value) &&
    modelRef.value.password.length >= value.length
  )
}
function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === modelRef.value.password
}

const submitBtnDisable = computed(() => {
  if (!model.value?.username) {
    return true
  } else {
    if (pagename.value == 'login' && !model.value?.password) {
      return true
    }
    if (pagename.value == 'reset' && !model.value?.captcha) {
      return true
    }
  }
  return false
})
const rules: FormRules = {
  username: [
    {
      message: '请输入账号'
    }
  ],
  captcha: [
    {
      message: '请输入验证码'
    }
  ],
  password: [
    {
      message: '请输入密码'
    }
  ],
  reenteredPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur']
    },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: 'input'
    },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input']
    }
  ]
}

const model = modelRef
const waitCaptcha = ref(0)
const captchaInputRef = ref<InputInst | null>(null)
const handleValidateButtonClick = (e) => {
  e.preventDefault()

  if (pagename.value == 'reset') {
    message.success('重置密码成功，新密码已发送至你的邮箱');
    setTimeout(() => {
      switchPageName()
    }, 1000);
    return
  }

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      console.log(modelRef.value);

      const { username, password } = modelRef.value;
      message.loading('登录中...');
      const params = {
        username,
        password,
      };
      try {
        const { code, message: msg } = await userStore.login(params);
        message.destroyAll();
        if (code == ResultEnum.SUCCESS) {



          const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
          message.destroyAll();
          message.success('登录成功，欢迎您');
          const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;

          if (route.name === LOGIN_NAME) {
            router.replace('/');
          } else router.replace(toPath);
        } else {
          message.destroyAll();
          message.info(msg || '登录失败');
        }
      } catch (error) {
        console.log(error);
      } finally {

      }



    } else {
      console.log(errors)
      message.error('验证失败')
    }
  })
}
const sendCaptcha = () => {
  message.success('验证码已发送至邮箱：***@sgs.com')
  waitCaptcha.value = 60
  const waitCaptchaTimer = setInterval(() => {
    waitCaptcha.value -= 1
    if (waitCaptcha.value == 0) {
      clearInterval(waitCaptchaTimer)
    }
  }, 1000)

  setTimeout(() => {
    captchaInputRef.value?.focus()
  }, 200);
}
const switchPageName = () => {
  pagename.value = pagename.value == 'reset' ? 'login' : 'reset'
  modelRef.value.captcha = ""
  modelRef.value.password = ""
  // 聚焦于对应的框
}
onMounted(() => {
  // 绑定监听事件
  window.addEventListener('keydown', keyDown)
})
onUnmounted(() => {
  // 销毁事件
  window.removeEventListener('keydown', keyDown, false)
})
// 点击回车键登录
const keyDown = (e: { keyCode?: any; preventDefault?: () => void; }) => {
  if (e.keyCode === 13) {
    handleValidateButtonClick(e)
  }
}

</script>

<style lang="less" scoped>
.formCon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;

  .title {
    margin-bottom: 30px;
    user-select: none;
    position: relative;

    .sysName {
      font-size: 34px;
      font-weight: 600;
      display: flex;
      gap: 10px;
      font-family: Tahoma, Verdana, STHeiTi, simsun, sans-serif;
      align-items: baseline;

      .noraml {
        background-image: -webkit-linear-gradient(13deg, rgb(75, 75, 75), #696969);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

      }

      .highLine {
        font-size: 42px;
        background-image: -webkit-linear-gradient(315deg, #d38842 25%, #ffa264);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .pageName {
      font-size: 30px;
      font-weight: 600;
      margin-right: 20px;
      color: #aaa;
    }
  }
}

.captchaPrefix {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  color: #aaa;
  display: flex;

  justify-content: center;


  span {
    // display: inline-block;
    // height: 10px;
  }
}

.loginForm {
  max-width: 400px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: #fff;
  padding: 30px;
  border-radius: 6px;
  overflow: hidden;

  .LoginBtnAff {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 10px;
  }

  .captchaBtn {
    color: #aaa;
    width: 120px;

    &.forbid {
      pointer-events: none;
    }

    .waitCaptcha {
      text-align: center;
      display: inline-block;
    }
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>