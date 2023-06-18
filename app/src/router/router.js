import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import LandingPage from "../pages/LandingPage.vue";
import Home from "../pages/Home.vue";
import AddTodo from '../pages/AddTodo.vue'
import store from "../app/store";

const routes = [
  { path: "/", component: LandingPage, meta: { auth: false } },
  { path: "/login", component: Login, meta: { auth: false } },
  { path: "/register", component: Register, meta: { auth: false } },
  { path: "/Home", component: Home, meta: { auth: true } },
  { path: "/addTodo", component: AddTodo, meta: { auth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.auth;
  const isLogged = store.getters.getIsLogged;

  if (requiresAuth && !isLogged) {
    next({ path: "/" });
  } else if (!requiresAuth && isLogged) {
    next({ path: "/home" });
  } else {
    next();
  }
});

export default router;
