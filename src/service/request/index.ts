import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { LxyRequestConfig } from './type'

class LxyRequest {
  instance: AxiosInstance
  constructor(config: LxyRequestConfig) {
    this.instance = axios.create(config)

    // 添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局请求成功拦截')

        return config
      },
      (err) => {
        console.log('全局请求失败拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局响应成功拦截')

        return res.data
      },
      (err) => {
        console.log('全局响应失败拦截')
        return err
      }
    )

    // 单个实例的拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn as any,
      config.interceptors?.requestFailureFn
    )

    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  request<T = any>(config: LxyRequestConfig<T>) {
    // 请求拦截器
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    // 响应拦截器
    return new Promise<T>((reslove, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          reslove(res)
        })
        .catch((err) => {
          if (config.interceptors?.responseSuccessFn) {
            err = config.interceptors.responseSuccessFn(err)
          }
          reject(err)
        })
    })
  }

  get<T = any>(config: LxyRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: LxyRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  put<T = any>(config: LxyRequestConfig<T>) {
    return this.request({ ...config, method: 'PUT' })
  }

  patch<T = any>(config: LxyRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }

  delete<T = any>(config: LxyRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
}

export default LxyRequest
