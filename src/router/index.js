import { createRouter, createWebHistory } from "vue-router";

import NotFound from "../components/NotFound.vue";
import Login from "../components/Login.vue";
import InsVue from "../views/InsVue.vue";
import InsVuex from "../views/InsVuex.vue";
import InsVueRouter from "../views/InsVueRouter.vue";
import InsGitHub from "../views/InsGitHub.vue";
import InsSourceTree from "../views/InsSourceTree.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/Main.vue"),
    children: [
      {
        path: "insVue",
        component: InsVue,
      },
      {
        path: "insVuex",
        component: InsVuex,
      },
      {
        path: "insVueRouter",
        component: InsVueRouter,
      },
      {
        path: "insGitHub",
        component: InsGitHub,
      },
      {
        path: "insSourceTree",
        component: InsSourceTree,
      },
    ],
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
