import { defineStore } from 'pinia';
import { store } from '@/store';
import { ACCESS_TOKEN, CURRENT_USER, IS_SCREENLOCKED } from '@/store/mutation-types';
import { ResultEnum } from '@/enums/httpEnum';

import { getUserInfo as getUserInfoApi, login, preLogin } from '@/api/user';
import { storage } from '@/utils/Storage';

import { HashPasswordBySHA256 } from '@/utils/password/SHA-256';

export type UserInfoType = {
  [x: string]: any;
  // TODO: add your own data
  name: string;
  email: string;
};

export interface IUserState {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  permissions: any[];
  info: UserInfoType;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: storage.get(ACCESS_TOKEN, ''),
    username: '',
    welcome: '',
    avatar: '',
    permissions: [],
    info: storage.get(CURRENT_USER, {}),
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getNickname(): string {
      return this.username;
    },
    getPermissions(): [any][] {
      return this.permissions;
    },
    getUserInfo(): UserInfoType {
      return this.info;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setAvatar(avatar: string) {
      this.avatar = avatar;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    setUserInfo(info: UserInfoType) {
      this.info = info;
    },
    // 登录

    async login(params: any) {
      // 请求盐值与迭代次数
      const res = await preLogin(params.username);
      if (res.code == 400) {
        return res;
      }
      // 先计算出当前密码Hash值
      const { hashPassword } = HashPasswordBySHA256(
        params.password,
        res.result.salt,
        res.result.saltRounds
      );

      // 计算出一个另一个随机hash值发给后端，如果登录成功则替换。
      // TODO 这里还是有安全问题，新的hash可能会被劫持，需要加密传送，但是jwt又比较容易被破解，可以使用动态jwt密码？
      // 可以使用jwt加一层保护
      const newHashPassword = HashPasswordBySHA256(params.password);
      // 登录
      const response = await login({
        staffId: params.username,
        toVerify: hashPassword,
        toUpdate: newHashPassword,
        preToken: res.result.preToken,
      });

      const { result, code } = response;
      if (code === ResultEnum.SUCCESS) {
        const ex = 7 * 24 * 60 * 60;
        storage.set(ACCESS_TOKEN, result.token, ex);
        storage.set(CURRENT_USER, result, ex);
        storage.set(IS_SCREENLOCKED, false);
        this.setToken(result.token);
        this.setUserInfo(result);
      }
      return response;
    },

    // 获取用户信息
    async getInfo() {
      const result = await getUserInfoApi(this.info.staffId);
      if (!result.permissions || result.permissions.length == 0) {
        console.log('permissionsList must be a non-null array !');
      }
      const permissionsList = result.permissions || [];
      this.setPermissions(permissionsList);
      this.setUserInfo(result);

      this.setAvatar(result.avatar);
      return result;
    },

    // 登出
    async logout() {
      this.setPermissions([]);
      this.setUserInfo({ name: '', email: '' });
      storage.remove(ACCESS_TOKEN);
      storage.remove(CURRENT_USER);
    },
  },
});

// Need to be used outside the setup
export function useUser() {
  return useUserStore(store);
}
