import { http } from '@/utils/http/axios';


/**
 * @description: 从数据库获取权限对应的微服务组件
 */
export function getMicoRouterList(data) {
  return http.request({
    url: '/mico-router',
    method: 'POST',
    data,
  });
}


/**
 * @description: 从后端9000端口获取已部署的微服务组件
 */
export function getMicroConfigList() {
  return http.request({
    url: 'https://api.flowt.work/mico-router/microConfigList',
    method: 'GET',
  });
}



