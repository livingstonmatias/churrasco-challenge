import Vue from "vue";
import VueRouter from "vue-router";

import { isAuth, isNotAuth } from "@/guards";

import DefaultLayout from "@/layout/DefaultLayout.vue";

import Login from "@/views/Login.vue";
import Products from "@/views/products/index.vue";
import AddProduct from "@/views/products/AddProduct.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: isNotAuth,
  },
  {
    path: "/",
    name: "products",
    component: DefaultLayout,
    children: [
      {
        path: "products",
        name: "products-list",
        component: Products,
        beforeEnter: isAuth,
      },
      {
        path: "products/add",
        name: "products-description",
        component: AddProduct,
        beforeEnter: isAuth,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
