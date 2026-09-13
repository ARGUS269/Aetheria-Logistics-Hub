import { createRouter, createWebHistory } from 'vue-router'

import LogisticsHub from './views/LogisticsHub.vue'

const routes = [
  { path: '/', redirect: "/logistic" },
  { path: '/logistic', component: LogisticsHub },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
