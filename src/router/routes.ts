import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/index.vue'),
    redirect: '/main/mainPanel',
    children: [
      {
        path: 'mainPanel',
        name: 'mainPanel',
        component: () => import('@/views/main/mainPanel/index.vue')
      },
      {
        path: 'ny',
        name: 'ny',
        component: () => import('@/views/main/ny/index.vue')
      },
      {
        path: 'gs',
        name: 'gs',
        component: () => import('@/views/main/gs/index.vue')
      }
    ]
  }
]
export default routes
