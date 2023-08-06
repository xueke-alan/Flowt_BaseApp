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
