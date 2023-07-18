// 乾坤路由生成器

import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';
import { LiveOff24Regular } from '@vicons/fluent';
import * as FluentIcons from '@vicons/fluent';
import qiankunBox from '@/views/qiankun/index.vue';
import page404 from '@/views/exception/404.vue';
import page503 from '@/views/exception/503.vue';
import page500 from '@/views/exception/500.vue';
import page403 from '@/views/exception/403.vue';
import { QiankunRouterItem } from '@/qiankun/router';
const fetchQiankunConfig = async (entry: string) => {
  return new Promise(async (resolve) => {
    let res: any;
    try {
      res = await fetch(entry + '/qiankun.config.json');
      const config = await res.json(); // 解析响应数据为 JavaScript 对象
      config.entry = entry;
      resolve(config);
    } catch (error) {
      resolve(false);
    }
  });
};

const handleQiankunRouter = (config) => {
  config.defaultUrl = config.children[0].path;
  if (config.iconName) {
    const iconnode = FluentIcons[config.iconName];
    // 如果没有iconname无错误，渲染icon
    config.icon = iconnode ? renderIcon(iconnode) : null;
  }
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
  return config;
};

const qiankunOfflineRouter = (baseConfig: QiankunRouterItem) => {
  const { state, title, path, group, hidden, affix } = baseConfig;

  // 如果State为0，直接返回一个503开发中页面
  // 如果State为2，直接返回一个503开发中页面
  // 如果State为3，直接返回一个500开发中页面
  // 如果State为4，直接返回一个403开发中页面
  let component;
  switch (state) {
    case 0:
      component = page404;
      break;
    case 2:
      component = page503;

      break;
    case 3:
      component = page500;

      break;
    case 4:
      component = page403;

      break;
    default:
      // 在其他状态下执行的操作
      // 执行默认操作的代码
      break;
  }

  return [
    {
      path: `/${path}`,
      name: path,
      redirect: `/${path}/offline`,
      component: Layout,
      meta: {
        title,
        icon: renderIcon(LiveOff24Regular),
        sort: 1,
        group,
        hidden,
        noKeepAlive: true,
      },
      children: [
        {
          path: `offline`,
          name: `${path}_offline`,
          component,
          meta: {
            title,
            icon: renderIcon(LiveOff24Regular),
            sort: 1,
            group,
            affix,
            noKeepAlive: true,
          },
        },
      ],
    },
    {
      path: `/${path}/:offline(.*)`,
      name: `${path}/offline`,
      redirect: `/${path}/offline`,
      component: Layout,
      meta: {
        hidden: true,
      },
    },
  ];
};

const qiankunSuccessRouter = (config) => {
  const children: any = config.children;
  const micoName: any = config.name;
  const micoBaseUrl: any = config.baseUrl;
  const defaultUrl: any = config.defaultUrl;
  const title: any = config.title;
  const group: any = config.group;
  const icon: any = config.icon;
  const entry: any = config.entry;
  const hidden: any = config.hidden;
  const affix: any = config.affix;
  const permissions: any = config.permissions;

  const dynamicRoutes: Array<RouteRecordRaw> = [
    {
      path: `/${micoBaseUrl}`,
      name: micoBaseUrl,
      redirect: `/${micoBaseUrl}/${defaultUrl}`,
      component: Layout,
      meta: {
        title,
        icon,
        isQiankunRouter: {
          name: micoName,
          entry,
          container: '#main-view-qiankun',
          activeRule: getActiveRule(`/${micoBaseUrl}`),
        },
        sort: 1,
        group,
        noKeepAlive: false,
        hidden,
        affix,
        disabled: config ? false : true,
        permissions,
      },
      children: children.map((c) => ({
        ...c,
        component: qiankunBox,
      })),
    },
    {
      path: `/${micoBaseUrl}/offline`,
      name: `/${micoBaseUrl}-offline-redirect`,
      redirect: `/${micoBaseUrl}/${defaultUrl}`,
      component: Layout,
      meta: {
        hidden: true,
      },
      children: [],
    },
  ];
  return dynamicRoutes;
};

export const createMicoRoutes = async (qiankunconfig: QiankunRouterItem[]) => {
  const qiankunRouterList: any = [];
  for (const configItem of qiankunconfig) {
    switch (configItem.state) {
      case 0:
      case 2:
      case 3:
      case 4:
        // 在状态为0、2或3时执行的操作
        qiankunRouterList.push(qiankunOfflineRouter(configItem));
        break;
      case 1:
        // 在状态为1时执行的操作
        const config: any = await fetchQiankunConfig(configItem.entry);

        if (config) {
          //  得到的配置文件可能与base配置属性不一致，需要重合，属性一样时以await的值为准

          // meta也要重叠

          const configAssign = Object.assign(configItem, config);

          // console.log(configItem.permissions);
          // console.log(configItem.permissions);
          // configAssign.meta = {}
          // configAssign.meta.permissions = configItem.permissions || [];
          // config.affix = configItem.affix;
          console.log(configAssign);

          // 完善路由器
          handleQiankunRouter(configAssign);
          qiankunRouterList.push(qiankunSuccessRouter(configAssign));
        } else {
          // 返回offline路由
          qiankunRouterList.push(qiankunOfflineRouter(configItem));
        }
        break;
    }
  }
  return qiankunRouterList;
};

export const getActiveRule = (routerPrefix: string) => {
  return (location: { pathname: string }) => location.pathname.startsWith(routerPrefix);
};
