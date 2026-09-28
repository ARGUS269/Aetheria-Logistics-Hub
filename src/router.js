import { createRouter, createWebHistory } from "vue-router";

const LogisticsHub = () => import("@/views/LogisticsHub.vue");
const SettingsPage = () => import("@/views/SettingsPage.vue");

const routes = [
  {
    path: "/",
    redirect: "/logistic",
  },
  {
    path: "/logistic",
    component: LogisticsHub,
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    component: SettingsPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/logistic",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

let isInitialAppLoad = true;
router.beforeEach((to, from, next) => {

  if (isInitialAppLoad) {
    isInitialAppLoad = false;

    next("/logistic");
  }

  next(); // Access granted smoothly across tracking paths!
});

export default router;
