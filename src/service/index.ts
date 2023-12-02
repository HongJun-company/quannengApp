import LxyRequest from './request'
import { BASE_URL, TIME_OUT } from './config/index'
import { localCache } from '@/utils/cache'

const lxyRequest = new LxyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  interceptors: {
    requestSuccessFn(config) {
      const token = localCache.getCache('token')
      if (config.headers && token) {
        config.headers.token = token
      }
      console.log('单个实例的请求成功拦截')

      return config
    },
    requestFailureFn(err) {
      console.log('单个实例的请求失败拦截')
      return err
    },
    responseSuccessFn(res) {
      console.log('单个实例的响应成功拦截')
      return res
    },
    responseFailureFn(err) {
      console.log('单个实例的响应失败拦截')
      return err
    }
  }
})

export default lxyRequest
