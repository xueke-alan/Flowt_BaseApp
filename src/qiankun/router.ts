/**
 * 描述一个 qiankun 路由参数的接口
 * @interface QiankunRouterItem
 */
export interface QiankunRouterItem {
  /**
   * qiankun 入口
   * @type qiankun入口地址
   * @memberof QiankunRouterItem
   */
  entry: string;

  /**
   * 标题
   * @type 入口访问失败的时候作为标题使用
   * @memberof QiankunRouterItem
   */
  title: string;

  /**
   * 路径
   * @type 入口访问失败的时候作为路径使用
   * @memberof QiankunRouterItem
   */
  path: string;

  /**
   * 分组
   * @type 入口访问失败的时候作为分组使用
   * @memberof QiankunRouterItem
   */
  group: string;

  /**
   * 分组
   * @type 是否在菜单栏隐藏
   * @memberof QiankunRouterItem
   */
  hidden?: boolean;

  /**
   * 分组
   * @type 是否在面包屑中固定
   * @memberof QiankunRouterItem
   */
  affix?: boolean;

  /**
   * 开发状态
   * 0 - 未开发
   * 1 - 开发完毕
   * 2 - 开发中
   * 3 - 故障
   * @type {number}
   * @memberof QiankunRouterItem
   */
  state: 0 | 1 | 2 | 3 | 4 | 5;

  /**
   * 开发状态
   * 0 - 未开发
   * 1 - 开发完毕
   * 2 - 开发中
   * 3 - 故障
   * @type {number}
   * @memberof QiankunRouterItem
   */
  permissions?: any[];
}
// 路由表
export const qiankunRouters: QiankunRouterItem[] = [
  {
    state: 2,
    entry: 'http://localhost:0000',
    title: '总览面板',
    path: 'dashboard',
    group: 'main',
    // affix: true,
  },
  {
    state: 2,
    entry: 'http://localhost:0000',
    title: '路由管理',
    path: 'router',
    group: '开发者',
  },
  {
    state: 2,
    entry: 'http://localhost:0000',
    title: '全局消息',
    path: 'messageroot',
    group: '开发者',
  },
  {
    state: 1,
    entry: 'http://localhost:8085',
    title: '账号管理',
    path: 'account',
    group: '实验室管理',
    permissions: ['dashboard_workplace'],
  },
  {
    state: 0,
    entry: 'http://localhost:0000',
    title: '机器人',
    path: 'roubt',
    group: '实验室管理',
  },
  {
    state: 4,
    entry: 'http://localhost:0000',
    title: '设备管理',
    path: 'equip',
    group: '测试',
  },
  {
    state: 4,
    entry: 'http://localhost:0000',
    title: '任务看板',
    path: 'kanban',
    group: '测试',
  },
  {
    state: 4,
    entry: 'http://localhost:0000',
    title: '测试项目',
    path: 'testline',
    group: '测试',
  },
  {
    state: 3,
    entry: 'http://localhost:0000',
    title: '草稿编辑',
    path: 'drift',
    group: '测试',
  },

  {
    state: 4,
    entry: 'http://localhost:0000',
    title: '迟单管理',
    path: 'lateorder',
    group: '测试',
  },

  {
    state: 4,
    entry: 'http://localhost:0000',
    title: '样品管理',
    path: 'sample',
    group: '测试',
  },
  {
    state: 4,
    entry: 'http://localhost:0000',
    title: '图片数据库',
    path: 'photos',
    group: '测试',
  },
  {
    state: 4,
    entry: 'http://localhost:0000',
    title: '本地服务',
    path: 'local',
    group: '',
  },
  {
    state: 2,
    entry: 'http://localhost:0000',
    title: '个人中心',
    path: 'personal',
    group: 'main',
    hidden: true,
  },
  {
    state: 4,
    entry: 'http://localhost:0000',
    title: '小工具',
    path: 'tools',
    group: '',
  },
  {
    state: 4,
    entry: 'http://localhost:0000',
    title: '开发记录',
    path: 'dev',
    group: '',
    hidden: true,
  },
  {
    state: 4,
    entry: 'http://localhost:0000',
    title: 'ChatGPT',
    path: 'chat',
    hidden: true,
    group: '',
  },
];

export const qiankunRoutersSort = ['main', '开发者', '实验室管理', '测试'];
