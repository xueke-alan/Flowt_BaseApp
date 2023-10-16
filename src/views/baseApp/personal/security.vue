<template>
  <div class="securityMain">
    <div class="bigTitle">

      <n-icon style="margin-right: 10px;margin-top: 2px;">
        <component :is="Key24Regular"></component>
      </n-icon>
      <span>安全</span>
    </div>
    <div class="inputGroup">
      <div class="mainInput" style="flex: 2;">
        <div class="lable">工号</div>
        <n-input value="GZ10548" :disabled="true" />
      </div>
      <div class="mainInput" style="flex: 3;">
        <div class="lable">邮件地址</div>
        <n-input placeholder="请输入新的邮件地址" value="xueke.alan@hw.com" :disabled="true" />
      </div>
    </div>
    <div class="mainInput">
      <div class="lable">电话号码</div>
      <div class="inputGroup">
        <n-input placeholder="大" readonly value="19998765432" style="flex: 1;" />
        <n-button ghost>
          申请更改
        </n-button>
      </div>
    </div>
    <n-divider />



    <div class="mainInput">
      <n-space justify="space-between" align="center">
        <div class="lable">
          更改密码
          <div class="dic">至少需要包含3种类型的字符12位</div>
        </div>

        <n-rate :count="4" :value="newPswStrength" readonly color="#4fb233" size="small" class="pswStrength">
          <n-icon size="28" class="rateItem">
            <component :is="TextColorAccent24Filled"></component>
          </n-icon>
        </n-rate>
      </n-space>


      <n-input placeholder="输入新密码" type="password" v-model:value="newPsw" />

    </div>
    <div class="mainInput">
      <div class="lable">确认密码</div>

      <div class="inputGroup">
        <n-input :placeholder="pswState.btnLable" type="password" v-model:value="newPswCheck" />
        <n-button ghost style="width: 150px;" :class="{ disableSub: pswState.code <= 3 }">
          <transition name="fade" mode="out-in">
            <span :key="pswState.btnLable">{{ pswState.btnLable }}</span>
          </transition>
        </n-button>
      </div>
    </div>

    <n-divider />
    <div class="bigTitle">
      <n-icon style="margin-right: 10px;margin-top: 2px;">
        <component :is="BuildingMultiple24Regular"></component>
      </n-icon>
      <span>组织</span>
    </div>

    <div class="mainInput">
      <div class="lable">部门</div>
      <n-input value="GZMR 物理组 测试工程师" :disabled="true" />
    </div>

    <div class="mainInput">
      <div class="lable">管理员</div>
      <n-input value="Alan_xue" :disabled="true" />
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

// BUG 以数字开头的密码强度始终显示为0
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

const pswState = computed(() => {
  if (newPsw.value == '') {
    return { code: 0, btnLable: '请输入新密码' }
  }
  else if (newPswStrength.value < 3) {
    return { code: 1, btnLable: '密码强度过低' }
  }
  else if (newPswCheck.value == '') {
    return { code: 2, btnLable: '请再次确认密码' }
  }
  else if (newPsw.value != newPswCheck.value) {
    return { code: 3, btnLable: '两次密码不匹配' }
  }
  else {
    return { code: 4, btnLable: '提交修改' }
  }
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
    flex: 1;

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

    }

    .pswStrength {
      --n-item-color: #d8d8d866 !important;
    }


  }

  .inputGroup {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    .disableSub {
      pointer-events: none;
      color: #aaa;
    }
  }
}
</style>