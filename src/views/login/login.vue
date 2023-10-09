<template>
  <div class="formCon">
    <div class="title">
      <div class="sysName">SGS Flowt System</div>
      <div class="pageName">Login .</div>
    </div>

    <n-form ref="formRef" :model="model" :rules="rules" class="loginForm">
      <n-form-item path="age" label="账号">
        <n-input size="large" v-model:value="model.age" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input size="large" v-model:value="model.password" type="password" @input="handlePasswordInput"
          @keydown.enter.prevent />
      </n-form-item>
      <!-- <n-form-item ref="rPasswordFormItemRef" first path="reenteredPassword" label="重复密码">
        <n-input v-model:value="model.reenteredPassword" :disabled="!model.password" type="password"
          @keydown.enter.prevent />
      </n-form-item> -->

      <div>
        <n-button block :disabled="model.age === null" type="primary" @click="handleValidateButtonClick">
          登录
        </n-button>

        <div class="LoginBtnAff">
          <n-checkbox size="small" label="记住我" />
          <n-button quaternary size="small" text-color="#aaa">
            忘记密码
          </n-button>
        </div>

        <n-divider />
        <n-space justify="end">
          <n-button secondary size="small">访客登录</n-button>
          <n-button type="primary" secondary  size="small">SSO 登录</n-button>
        </n-space>
      </div>

    </n-form>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  FormInst,
  FormItemInst,
  FormItemRule,
  useMessage,
  FormRules,
} from 'naive-ui'

interface ModelType {
  age: string | null
  password: string | null
  reenteredPassword: string | null
}

export default defineComponent({
  setup() {
    const formRef = ref<FormInst | null>(null)
    const rPasswordFormItemRef = ref<FormItemInst | null>(null)
    const message = useMessage()
    const modelRef = ref<ModelType>({
      age: null,
      password: null,
      reenteredPassword: null
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
    const rules: FormRules = {
      // age: [
      //   {
      //     required: true,
      //     validator(rule: FormItemRule, value: string) {
      //       if (!value) {
      //         return new Error('需要年龄')
      //       } else if (!/^\d*$/.test(value)) {
      //         return new Error('年龄应该为整数')
      //       } else if (Number(value) < 18) {
      //         return new Error('年龄应该超过十八岁')
      //       }
      //       return true
      //     },
      //     trigger: ['input', 'blur']
      //   }
      // ],
      password: [
        {
          // required: true,
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
    return {
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      handlePasswordInput() {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
        }
      },
      handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success('验证成功')
          } else {
            console.log(errors)
            message.error('验证失败')
          }
        })
      }
    }
  }
})
</script>

<style lang="less" scoped>
.formCon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .title {
    margin-bottom: 10px;
    user-select: none;
    position: relative;
    transform-style: preserve-3d;

    &::after {
      content: '';
      position: absolute;
      width: 120px;
      height: 50px;
      background-color: orange;
      top: -25px;
      left: -50px;
      transform: translateZ(-1px) rotate(-25deg);
      opacity: .8;
      box-shadow: #ff6600 10px -10px;
    }


    .sysName {
      font-size: 34px;
      font-weight: 600;
      color: #3f3d3d;
      // line-height: 24px;
    }

    .pageName {
      font-size: 30px;
      font-weight: 600;

      margin-right: 20px;
      color: cadetblue;
    }
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
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
}
</style>