import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { localCache } from '@/utils/cache'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localCache.getCache('token')
  if (to.path.includes('/main')) {
    if (!token) {
      next('/login')
      ElMessage.error('请先登录')
    } else {
      next()
    }
  } else if (token && to.path === '/login') {
    next(from.path)
    ElMessage.warning('请勿重复登录')
  } else {
    next()
  }
})

export default router
