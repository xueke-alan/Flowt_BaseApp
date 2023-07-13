import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { getActiveRule } from '@/router/qiankun';
import { renderIcon } from '@/utils/index';

import qiankunBox from '@/views/qiankun/index.vue';
import { PeopleSettings24Regular } from '@vicons/fluent';
import * as FluentIcons from '@vicons/fluent';
const routeName = 'account';
const group = '实验室管理';
const qiankun_entry = 'http://localhost:8085';

const fetchChildren = async () => {
  return new Promise(async (resolve) => {
    const res = await fetch(qiankun_entry + '/qiankun.config.json');
    const data = await res.json(); // 解析响应数据为 JavaScript 对象
    for (const d of data) {
      if (d.meta.iconName) {
        const name = d.meta.iconName;
        console.log(name);

        const module = await import(`@vicons/fluent`).catch((error) => {
          console.error(`Failed to import module: ${error}`);
        });

        // const iconnode = module[name];

        // 直接从已导入的模块中获取图标
        const iconnode = FluentIcons[name];

        if (module) {
          console.log(module);
          const a = module.default;
          d.meta.icon = await renderIcon(iconnode);
        }
      }
    }

    resolve(data);
  });
};

const createRoutes = async () => {
  const codeChildren: any = await fetchChildren();
  const dynamicRoutes: Array<RouteRecordRaw> = [
    {
      path: `/${routeName}`,
      name: routeName,
      // redirect: `/${routeName}/user`,
      component: Layout,
      meta: {
        title: '账号管理',
        icon: renderIcon(PeopleSettings24Regular),
        isQiankunRouter: {
          name: 'sub-app-code',
          entry: qiankun_entry,
          container: '#main-view-qiankun',
          activeRule: getActiveRule(`/${routeName}`),
        },
        sort: 1,
        group,
        noKeepAlive: false,
      },
      children: codeChildren.map((c) => ({
        ...c,
        component: qiankunBox,
      })),
    },
  ];
  return dynamicRoutes;
};

export default createRoutes;
