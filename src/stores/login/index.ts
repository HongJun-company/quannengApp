import { defineStore } from 'pinia'
import { accountLogin } from '@/service/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
const useLoginStore = defineStore('login', {
  state: () => ({
    token: localCache.getCache('token') ?? '',
    userId: localCache.getCache('userId') ?? -1
  }),
  actions: {
    async loginAction(loginForm: any) {
      const res = await accountLogin({
        username: loginForm.account,
        password: loginForm.password
      })
      if (res.status === 0) {
        this.userId = res.data.userId
        this.token = res.data.token
        localCache.setCache('token', this.token)
        localCache.setCache('userId', this.userId)
        router.push('/main')
      }
    }
  }
})

export default useLoginStore
