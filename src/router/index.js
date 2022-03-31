import {
  createRouter,
  // createWebHistory,
  createWebHashHistory,
} from "vue-router";

import NotFound from "../components/NotFound.vue";
import Login from "../views/Login.vue";
import InsHome from "../views/InsHome.vue";
import InsAxios from "../views/InsAxios.vue";
import InsVue from "../views/InsVue.vue";
import InsVuex from "../views/InsVuex.vue";
import InsVueRouter from "../views/InsVueRouter.vue";
import InsGitHub from "../views/InsGitHub.vue";
import InsSourceTree from "../views/InsSourceTree.vue";
import MySchedule from "../views/MySchedule.vue";
import MyStock from "../views/MyStock.vue";
import MyStockSaleList from "../views/MyStockSaleList.vue";

export const Route_AXIOS = "insAxios";
export const Route_VUE = "insVue";
export const Route_VUEX = "insVuex";
export const Route_VUE_ROUTER = "insVueRouter";
export const Route_GITHUB = "insGitHub";
export const Route_SOURCE_TREE = "insSourceTree";
export const Route_MY_SCHEDULE = "mySchedule";
export const Route_MY_STOCK = "myStock";

/** 路由設定 */
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
        path: "",
        component: InsHome,
      },
      {
        path: `${Route_AXIOS}/:fehId`,
        component: InsAxios,
      },
      {
        path: `${Route_VUE}/:fehId`,
        component: InsVue,
      },
      {
        path: `${Route_VUEX}/:fehId`,
        component: InsVuex,
      },
      {
        path: `${Route_VUE_ROUTER}/:fehId`,
        component: InsVueRouter,
      },
      {
        path: `${Route_GITHUB}/:fehId`,
        component: InsGitHub,
      },
      {
        path: `${Route_SOURCE_TREE}/:fehId`,
        component: InsSourceTree,
      },
      {
        path: `${Route_MY_SCHEDULE}`,
        component: MySchedule,
      },
      {
        path: `${Route_MY_STOCK}`,
        component: MyStock,
      },
      {
        path: "salelist",
        component: MyStockSaleList,
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

/** 路由實體 */
const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
