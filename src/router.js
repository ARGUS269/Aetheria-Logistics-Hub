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
    // THE LOCK: meta flags mark this path as protected
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    component: SettingsPage,
    meta: { requiresAuth: true },
  },
  // FALLBACK ROUTE: Catches any random typos and safely redirects users back home
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
  // 1. Scan the browser context to see if our session cookie is alive
  const isAuthenticated = document.cookie.includes("ag_auth_session=true");
  if (isInitialAppLoad) {
    isInitialAppLoad = false; // Turn off immediately so internal link clicking works normally!

    // If they refreshed from anywhere else (like /settings), block it and force them back home
    if (to.path !== "/logistic") {
      return next("/logistic");
    }
  }

  // 2. INTERCEPTION GUARD: If a path requires login but the user is a stranger...
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next(); // Access granted smoothly!
  }
});

export default router;
