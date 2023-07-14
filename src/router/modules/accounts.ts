import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { getActiveRule } from '@/router/qiankun';
import { renderIcon } from '@/utils/index';

import qiankunBox from '@/views/qiankun/index.vue';
import { PeopleSettings24Regular } from '@vicons/fluent';
import * as FluentIcons from '@vicons/fluent';

const qiankun_entry = 'http://localhost:8085';

const fetchQiankunConfig = async (entry: string) => {
  return new Promise(async (resolve) => {
    const res = await fetch(entry + '/qiankun.config.json');
    // 如果res没有结果，需要删除这条路由的子路由，并打上tag：注明无结果
    if (res) {
      const config = await res.json(); // 解析响应数据为 JavaScript 对象
      // 处理每一个微服务子路由
      config.defaultUrl = config.children[0].path;
      for (const childRouter of config.children) {
        // 配置微服务默认路由,如果微服务没有配置默认路由，则默认路由为第一个路由，否则为最后一个meta.default为true的路由
        if (childRouter.meta.default) {
          config.defaultUrl = childRouter.path;
        }
        // 配置所有的name为 micoBaseUrl + path
        childRouter.name = `${config.baseUrl}_${childRouter.path}`;

        // 如果配置了icon，渲染icon
        if (childRouter.meta.iconName) {
          const name = childRouter.meta.iconName;
          // 直接从已导入的模块中获取图标
          const iconnode = FluentIcons[name];
          // 如果没有iconname无错误，渲染icon

          childRouter.meta.icon = iconnode ? renderIcon(iconnode) : null;
        }
      }
      resolve(config);
    } else {
      resolve(false);
    }
  });
};

const createRoutes = async () => {
  const config: any = await fetchQiankunConfig(qiankun_entry);
  // TODO 如果无返回值，则返回不可用的 dynamicRoutes
  const children: any = config.children;
  const micoName: any = config.name;
  const micoBaseUrl: any = config.baseUrl;
  const defaultUrl: any = config.defaultUrl;
  const title: any = config.title;
  const group: any = config.group;
  const dynamicRoutes: Array<RouteRecordRaw> = [
    {
      path: `/${micoBaseUrl}`,
      name: micoBaseUrl,
      // redirect: `/${micoBaseUrl}/${defaultUrl}`,
      component: Layout,
      meta: {
        title: title,
        icon: renderIcon(PeopleSettings24Regular),
        extra: renderIcon(PeopleSettings24Regular),
        isQiankunRouter: {
          name: micoName,
          entry: qiankun_entry,
          container: '#main-view-qiankun',
          activeRule: getActiveRule(`/${micoBaseUrl}`),
        },
        sort: 1,
        group,
        noKeepAlive: false,
        disabled: true,
      },
      // children: children.map((c) => ({
      //   ...c,
      //   component: qiankunBox,
      // })),
    },
  ];
  return dynamicRoutes;
};

export default createRoutes;
