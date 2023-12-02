import { getUserInfo, getUserStatus } from '@/service/main'
import { defineStore } from 'pinia'
type IState = {
  inviteCode: string
  username: string
  msg: string
}
const useMainStore = defineStore('main', {
  state: (): IState => ({
    inviteCode: '',
    username: '',
    msg: ''
  }),
  actions: {
    async getUserInfoAction(userId: number) {
      const res = await getUserInfo(userId)
      if (res.status === 0) {
        this.inviteCode = res.data.inviteCode
        this.username = res.data.username
      }
    },
    async getUserStatus(userId: number) {
      const { msg, status } = await getUserStatus(userId)
      if (status === 0) {
        this.msg = msg
      }
    }
  }
})

export default useMainStore
