import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 自定义拦截器接口类型
interface LYRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}
//自定义扩展一下axios 配置类型 方便添加拦截器配置
interface LYRequestConfig extends AxiosRequestConfig {
  interceptors?: LYRequestInterceptors
}
export { LYRequestInterceptors, LYRequestConfig }
