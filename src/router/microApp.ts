// 乾坤路由生成器

import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';
import { LiveOff24Regular, WindowHeaderHorizontalOff20Filled } from '@vicons/fluent';
import * as FluentIcons from '@vicons/fluent';
import micoAppBox from '@/views/micoApp/index.vue';
import page404 from '@/views/exception/404.vue';
import page503 from '@/views/exception/503.vue';
import page500 from '@/views/exception/500.vue';
import page403 from '@/views/exception/403.vue';
import { MicroAppRouterItem } from '@/micoApp/interface';
import { devApp } from './devRouter';
import { useGlobSetting } from '@/hooks/setting';
const { sigleMicroAppContainer } = useGlobSetting();
const projectName = import.meta.env.VITE_MICROAPP_URL;
/**
 * 完善微服务路由
 * @micoAppconfig 从数据库依据权限拿到的全部路由
 * @microConfigList 后端拿到的已部署成功的路由、开发中的路由
 *
 */
export const createMicoRoutes = async (micoAppconfig: MicroAppRouterItem[], microConfigList) => {
  const micoAppRouterList: any = [];
  // 将 从数据库依据权限拿到的路由 全部完善好
  for (const configItem of micoAppconfig) {
    switch (configItem.state) {
      case 0:
      case 2:
      case 3:
      case 4:
        // 在状态为0、2或3时执行的操作 将该路由置为离线
        micoAppRouterList.push(micoAppOfflineRouter(configItem));
        break;

      case 1:
        // 在状态为1时执行的操作 该路由理应是在线的
        // 从后端传回的路表中查找这个路由配置
        const config = microConfigList[configItem.path];

        if (config) {
          // 添加entry属性，为 wujie 提供入口网址
          // 如果在devApp中显示有这个路由，则添加本地开发模式的路由
          if (devApp[config.baseUrl]) {
            config.entry = devApp[config.baseUrl].entry;
          } else {
            config.entry = `${projectName}/${configItem.path}`;
          }

          // 得到的配置文件可能与base配置属性不一致，需要重合，属性一样时以后端返回的的值为准; meta也要重叠
          const configAssign = Object.assign(configItem, config);
          // 完善路由器
          handleMicoAppRouter(configAssign);
          // 以在线路由 push 入 micoAppRouterList 数组中
          micoAppRouterList.push(micoAppSuccessRouter(configAssign));
        } else {
          // 数据库显示部署，但是后端显示不在线，返回offline路由
          micoAppRouterList.push(micoAppOfflineRouter(configItem));
        }
        break;
    }
  }
  return micoAppRouterList;
};

/**
 * 预渲染微服务路由，包括将iconname转换为icon，自动生成name等。
 *
 */
const handleMicoAppRouter = (config) => {
  console.log(config);
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

const micoAppOfflineRouter = (baseConfig: MicroAppRouterItem) => {
  const { state, title, path, group, hidden, affix, permissions = [] } = baseConfig;

  // 如果State为0，直接返回一个503开发中页面
  // 如果State为2，直接返回一个503开发中页面
  // 如果State为3，直接返回一个500开发中页面
  // 如果State为4，直接返回一个403开发中页面
  let component, icon;
  switch (state) {
    case 0:
      component = page404;
      icon = renderIcon(WindowHeaderHorizontalOff20Filled);
      break;
    case 1:
      component = page500;
      icon = renderIcon(LiveOff24Regular);

      break;
    case 2:
      component = page503;
      icon = renderIcon(WindowHeaderHorizontalOff20Filled);

      break;
    case 3:
      component = page500;
      icon = renderIcon(WindowHeaderHorizontalOff20Filled);

      break;
    case 4:
      component = page403;
      icon = renderIcon(WindowHeaderHorizontalOff20Filled);

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
        icon,
        sort: 1,
        group,
        hidden,
        permissions,
      },
      children: [
        {
          path: `offline`,
          name: `${path}_offline`,
          component,
          meta: {
            title,
            icon,
            sort: 1,
            group,
            affix,
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

const micoAppSuccessRouter = (config) => {
  // const children: any = config.children;
  const micoName: any = config.name;
  const micoBaseUrl: any = config.baseUrl;
  const defaultUrl: any = config.defaultUrl;
  const title: any = config.title;
  const group: any = config.group;
  const icon: any = config.icon;
  const entry: any = config.entry;
  const hidden: any = config.hidden;
  const affix: any = config.affix;
  const permissions: any = config.permissions || [];

  const dynamicRoutes: Array<RouteRecordRaw> = [
    {
      path: `/${micoBaseUrl}`,
      name: micoBaseUrl,
      redirect: `/${micoBaseUrl}/${defaultUrl}`,
      component: Layout,
      meta: {
        title,
        icon,
        isMicoAppRouter: {
          name: micoName,
          entry,
        },
        sort: 1,
        group,
        hidden,
        affix,
        disabled: config ? false : true,
        permissions,
      },
      children: config.children.map((c) => ({
        ...c,
        component: micoAppBox,
        // 这里的 path 加上 '/:pra(.*)?' 后缀表示往后的'任意'参数都匹配，最后的 '?' 表示没有参数也匹配
        path: `${c.path}/:pra(.*)?`,
      })),
    },
  ];
  console.log(dynamicRoutes);
  return dynamicRoutes;
};
