/**
 * 描述一个 microApp 路由参数的接口
 * @interface MicroAppRouterItem
 */
export interface MicroAppRouterItem {
  /**
   * microApp 入口
   * @type microApp入口地址
   * @memberof MicroAppRouterItem
   */
  entry: string;

  /**
   * 标题
   * @type 入口访问失败的时候作为标题使用
   * @memberof MicroAppRouterItem
   */
  title: string;

  /**
   * 路径
   * @type 入口访问失败的时候作为路径使用
   * @memberof MicroAppRouterItem
   */
  path: string;

  /**
   * 分组
   * @type 入口访问失败的时候作为分组使用
   * @memberof MicroAppRouterItem
   */
  group: string;

  /**
   * 分组
   * @type 是否在菜单栏隐藏
   * @memberof MicroAppRouterItem
   */
  hidden?: boolean;

  /**
   * 分组
   * @type 是否在面包屑中固定
   * @memberof MicroAppRouterItem
   */
  affix?: boolean;

  /**
   * 开发状态
   * 0 - 未开发
   * 1 - 开发完毕
   * 2 - 开发中
   * 3 - 故障
   * @type {number}
   * @memberof MicroAppRouterItem
   */
  state: 0 | 1 | 2 | 3 | 4 | 5;

  /**
   * 开发状态
   * 0 - 未开发
   * 1 - 开发完毕
   * 2 - 开发中
   * 3 - 故障
   * @type {number}
   * @memberof MicroAppRouterItem
   */
  permissions?: any[];
}
