import { http } from '@/utils/http/axios';


/**
 * @description: 获取微服务组件
 */
export function getMicoRouterList(data) {
  return http.request({
    url: '/mico-router',
    method: 'POST',
    data,
  });
}

/**
 * @description: 获取微服务组件
 */
export function getMicroConfigList() {
  return http.request({
    url: 'https://api.flowt.work/mico-router/microConfigList',
    // url: '/mico-router/microConfigList',
    method: 'GET',
  });
}
/**
 * @description: 获取微服务组件
 */
export function getDevMicroConfig(url) {
  return http.request({
    url,
    method: 'GET',
  });
}


