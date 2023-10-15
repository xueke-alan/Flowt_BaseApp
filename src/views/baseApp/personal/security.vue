<template>
  <div class="securityMain">
    <div class="bigTitle">

      <n-icon style="margin-right: 10px">
        <component :is="Key24Regular"></component>
      </n-icon>
      <span>安全</span>
    </div>

    <div class="mainInput">
      <div class="lable">工号</div>
      <n-input value="GZ10548" :disabled="true" />
    </div>
    <div class="mainInput">
      <div class="lable">邮件地址</div>
      <n-input placeholder="请输入新的邮件地址" value="xueke.alan@hw.com" :disabled="true" />
    </div>
    <div class="mainInput">
      <div class="lable">电话号码</div>
      <n-input-group>
        <n-input placeholder="大" readonly value="19998765432" />
        <n-button ghost>
          申请更改
        </n-button>
      </n-input-group>
    </div>
    <n-divider />


    <div class="mainInput">
      <n-space justify="space-between" align="center" style="margin-right: 5px;">
        <div class="lable">
          更换密码
          <div class="dic">至少需要包含三种类型12位</div>
        </div>

        <n-rate :count="4" :value="newPswStrength" readonly color="#4fb233" size="small">
          <n-icon size="28" class="rateItem">
            <component :is="TextColorAccent24Filled"></component>
          </n-icon>
        </n-rate>
      </n-space>

      <n-input-group>
        <n-input placeholder="输入新密码" type="password" v-model:value="newPsw" />
      </n-input-group>
    </div>
    <div class="mainInput">
      <div class="lable">确认密码</div>

      <n-input-group>
        <n-input placeholder="再次输入新密码" type="password" v-model:value="newPswCheck" />
        <n-button ghost style="width: 150px;">
          <!-- <span>提交更改</span> -->
          <span>密码强度过低</span>
          <!-- <span>两次密码不匹配</span> -->
        </n-button>
      </n-input-group>
    </div>

    <n-divider />
    <div class="bigTitle">
      <n-icon style="margin-right: 10px">
        <component :is="BuildingMultiple24Regular"></component>
      </n-icon>
      <span>组织</span>
    </div>



    <n-divider />



    <n-space>

      <n-button>退出登录</n-button>
    </n-space>
  </div>
</template>


<script setup lang="ts">
import { BuildingMultiple24Regular, Key24Regular, TextColorAccent24Filled } from "@vicons/fluent";
import { computed } from "vue";
import { ref } from "vue";
import { passwordStrength } from '@cmss/check-password-strength'
const newPsw = ref('')
const newPswCheck = ref('')
const newPswStrength = computed(() => {


  const config = [
    {
      id: 0,
      value: "Too Too weak",
      minDiversity: 0,
      minLength: 0
    },
    {
      id: 1,
      value: "Too weak",
      minDiversity: 0,
      minLength: 1
    },
    {
      id: 2,
      value: "Weak",
      minDiversity: 2,
      minLength: 6
    },
    {
      id: 3,
      value: "Medium",
      minDiversity: 4,
      minLength: 8
    },
    {
      id: 4,
      value: "Strong",
      minDiversity: 4,
      minLength: 12
    }
  ]
  return passwordStrength(newPsw.value, config).id

})
</script>

<style lang="less" scoped>
.securityMain {
  padding: 0 20px;
  max-width: 500px;
  // color: #1e1e1e;

  .bigTitle {
    font-size: 24px;
    font-weight: 800;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }

  .mainInput {
    margin-top: 15px;

    .lable {
      font-size: 14px;
      margin-bottom: 5px;

      // font-weight: 600;
      .dic {
        font-size: 12px;
        color: #aaa;
      }
    }

    .rateItem {
      transform: scale3d(1.4, 1, 1);
      opacity: .5;
    }
  }
}
</style>