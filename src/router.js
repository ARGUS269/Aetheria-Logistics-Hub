import { createRouter, createWebHistory } from 'vue-router'

import LogisticsHub from './views/LogisticsHub.vue'
import SettingsPage from './views/SettingsPage.vue'

const routes = [
  { path: '/', redirect: "/logistic" },
  { path: '/logistic', component: LogisticsHub },
  { path: '/settings', component: SettingsPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
