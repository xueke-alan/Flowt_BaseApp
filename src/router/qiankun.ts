// 乾坤路由生成器

import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';
import { LiveOff24Regular, WindowHeaderHorizontalOff20Filled } from '@vicons/fluent';
import * as FluentIcons from '@vicons/fluent';
import qiankunBox from '@/views/qiankun/index.vue';
import page404 from '@/views/exception/404.vue';
import page503 from '@/views/exception/503.vue';
import page500 from '@/views/exception/500.vue';
import page403 from '@/views/exception/403.vue';
import { QiankunRouterItem } from '@/qiankun/interface';

import { useGlobSetting } from '@/hooks/setting';
const { sigleQiankunContainer } = useGlobSetting();

let microConfigList = [];

export const createMicoRoutes = async (qiankunconfig: QiankunRouterItem[], _microConfigList) => {
  microConfigList = _microConfigList;
  console.log(microConfigList);
  
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
        const config: any = await fetchQiankunConfig(configItem.path, configItem.entry);
        console.log(config);

        if (config) {
          // 得到的配置文件可能与base配置属性不一致，需要重合，属性一样时以await的值为准
          // meta也要重叠
          const configAssign = Object.assign(configItem, config);
          // 完善路由器
          handleQiankunRouter(configAssign);
          qiankunRouterList.push(qiankunSuccessRouter(configAssign));
        } else {
          // 返回offline路由
          // TODO 逻辑处理
          qiankunRouterList.push(qiankunOfflineRouter(configItem));
        }
        break;
    }
  }
  return qiankunRouterList;
};

const fetchQiankunConfig = async (path: string, entry: string) => {
  try {
    // const res = await fetch('https://api.flowt.work/mico-router/microConfigList');
    // if (!res.ok) {
    //   throw new Error('Network response was not ok');
    // }

    // const microConfigList = await res.json();
    // console.log(microConfigList);
    console.log(path);

    const config = microConfigList[path];
    console.log(config);
    if (config) {
      config.entry = `https://microapp.flowt.work/${path}`;

      if (config.baseUrl == 'quote') {
        config.entry = `http://localhost:5173/quote`;
        console.log('修改了entry');
        
      }
      // config.entry = entry;
    }
    return config;
  } catch (error) {
    console.error(error);
    // 数据库中显示已部署，但是连接失败
    return false;
  }
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
  const { state, title, path, group, hidden, affix, permissions = [] } = baseConfig;

  // 如果State为0，直接返回一个503开发中页面
  // 如果State为2，直接返回一个503开发中页面
  // 如果State为3，直接返回一个500开发中页面
  // 如果State为4，直接返回一个403开发中页面
  let component, icon;
  switch (state) {
    case 0:
      component = page404;
      icon = renderIcon(LiveOff24Regular);
      break;
    case 1:
      component = page500;
      icon = renderIcon(WindowHeaderHorizontalOff20Filled);

      break;
    case 2:
      component = page503;
      icon = renderIcon(LiveOff24Regular);

      break;
    case 3:
      component = page500;
      icon = renderIcon(LiveOff24Regular);

      break;
    case 4:
      component = page403;
      icon = renderIcon(LiveOff24Regular);

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
        noKeepAlive: true,
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
        isQiankunRouter: {
          name: micoName,
          entry,
          // 如果是单组件挂载乾坤微服务，则只有一个容器 "qiankun"
          container: `#main-view-qiankun-${sigleQiankunContainer ? 'qiankun' : micoBaseUrl}`,
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
      children: [
        ...children.map((c) => {
          return {
            ...c,
            path: `${c.path}/:pra(.*)*`,
            component: qiankunBox,
          };
        }),
      ],
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

export const getActiveRule = (routerPrefix: string) => {
  return (location: { pathname: string }) => location.pathname.startsWith(routerPrefix);
};
