<template>
  <div class="rightIcon">
    <n-popover trigger="click" placement="bottom-end" style="width: 220px">
      <template #trigger>
        <!-- <div style="display: flex;"> -->
        <n-button text style="display: flex">
          <n-avatar :size="20" :src="avatar" fallback-src="" style="pointer-events: none" />
        </n-button>
      </template>
      <template #header>
        <div class="flex-align-items unselect" style="padding: 3px 0">
          <div class="avatar">
            <n-avatar :size="38" :src="avatar" fallback-src="" />
          </div>
          <div class="userInfo">
            <div>{{ username }}</div>
            <div>
              <span style="font-size: 12px"> {{ usernameCn }} </span>
              <span style="color: #aaa; font-size: 12px"> GZ10548 </span>
            </div>
          </div>
        </div>
      </template>
      <div class="flex-align-items unselect">
        <n-button text @click="toPersonal" class="button">
          <n-icon size="18" class="mr-1">
            <component :is="Person24Regular" />
          </n-icon>

          <span>个人</span>
        </n-button>

        <div class="rigth">
          <span style="color: #aaa; font-size: 12px">物理组测试工程师</span>
        </div>
      </div>
      <template #footer>
        <div class="footer unselect">
          <span class="flex-align-items">
            <n-button text @click="doLogout" class="button">
              <n-icon size="18" class="mr-1">
                <component :is="DoorArrowLeft24Regular" />
              </n-icon>

              <span>退出登录</span>
            </n-button>
          </span>
          <span class="flex-align-items">
            <n-button text class="button">
              <n-icon size="18" class="mr-1">
                <component :is="LockClosed24Regular" />
              </n-icon>

              <span>锁定</span>
            </n-button>
          </span>
        </div>
      </template>
    </n-popover>

    <!-- TODO 退出登录确认框 -->
    <!-- 登陆成功后除了message和顶部loading，还需要视口内加一个提示，可以对登录按钮进行修改，修改为：资源加载中 -->
  </div>
</template>

<script lang="ts" setup>
import { DoorArrowLeft24Regular, LockClosed24Regular, Person24Regular } from '@vicons/fluent';
import { useUserStore } from '@/store/modules/user';

const userStore = useUserStore();
const { avatar, username, usernameCn } = userStore?.info || {};
import { useDialog, useMessage } from 'naive-ui';
import { useRouter, useRoute } from 'vue-router';

const dialog = useDialog();
const message = useMessage();
const router = useRouter();
const route = useRoute();
import { TABS_ROUTES } from '@/store/mutation-types';

const toPersonal = () => {
  router.push({ name: 'personal' });
};

// 退出登录
const doLogout = () => {
  dialog.info({
    title: '提示',
    content: '您确定要退出登录吗',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      userStore.logout().then(() => {
        // message.success('成功退出登录');
        // 移除标签页
        localStorage.removeItem(TABS_ROUTES);
        router.replace({
          name: 'Login',
          query: {
            redirect: route.fullPath,
          },
        });
        // .finally(() => location.reload());
        // 这里要重置账号密码吗，没有搞懂意义
      });
    },
    onNegativeClick: () => { },
  });
};
</script>

<style lang="less" scoped>
.avatar {
  display: flex;
  align-items: center;
}

.rightIcon {
  padding-left: 3px;
}

.unselect {
  user-select: none;

  .avatar {
    pointer-events: none;
  }
}

.flex-align-items {
  display: flex;
  align-items: center;
  margin: 2px 0;

  .rigth {
    padding-top: 1px;
    display: flex;
    justify-content: flex-end;
    flex: 1;
    align-items: center;
  }

  .button {
    margin-top: 0;
    margin-bottom: 0;
  }
}

.userInfo {
  margin-left: 10px;
  line-height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 38px;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
