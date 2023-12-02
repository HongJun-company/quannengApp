import type { AxiosRequestConfig, AxiosResponse } from 'axios'
interface LxyInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface LxyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: LxyInterceptors<T>
}
