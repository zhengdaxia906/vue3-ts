import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { LYRequestInterceptors, LYRequestConfig } from './type'

class LYRequest {
  instance: AxiosInstance
  interceptors?: LYRequestInterceptors
  constructor(config: LYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 添加实例配置传来的拦截器
    // console.log(config.interceptors)
    this.instance.interceptors.request.use((config) => {
      return config
    })
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 可以在这添加所有都需要的拦截器
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        return err
      }
    )
  }

  request<T>(config: LYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T>(config: LYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: LYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: LYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: LYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'P' })
  }
}

export default LYRequest
