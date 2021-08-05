import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/product-detail/:id",
    name: "product-detail",
    component: () => import("../views/ProductDetail.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/cart-page",
    name: "cart-page",
    component: () => import("../views/CartPage.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/order-page",
    name: "order-page",
    component: () => import("../views/OrderPage.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/check-order",
    name: "check-order",
    component: () => import("../views/CheckOrder.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    if (localStorage.token) {
      return;
    } else {
      return { name: "login" };
    }
  } else {
    return;
  }
});

export default router;
