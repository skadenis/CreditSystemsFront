import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

import Leads from "../views/Leads/index.vue";
import AddLead from "../views/Leads/Lead/add.vue";
import EditLead from "../views/Leads/Lead/edit.vue";

import Calculator from "../views/Calculator.vue";

import AddProduct from "../views/Product/add.vue";
import EditProduct from "../views/Product/edit.vue";

import Banks from "../views/Banks/index.vue";
import AddBank from "../views/Banks/Bank/add.vue";
import EditBank from "../views/Banks/Bank/edit.vue";

Vue.use(VueRouter);

let routes = [
  {
    // will match everything
    path: "*",
    name: "404",
    layout: "login",
    meta: {
      layoutClass: "login",
    },
    component: () => import("../views/404.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "login",
    meta: {
      layoutClass: "login",
      name: "Login",
    },
  },

  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      layoutClass: "home",
      name: "Главная",
    },
  },
  {
    path: "/leads",
    name: "Leads",
    component: Leads,
    meta: {
      layoutClass: "Leads",
      name: "Лиды",
    },
  },
  {
    path: "/leads/add",
    name: "AddLead",
    component: AddLead,
    meta: {
      layoutClass: "AddLead",
      name: "Добавить",
    },
  },
  {
    path: "/leads/:LeadId",
    name: "EditLead",
    component: EditLead,
    meta: {
      layoutClass: "EditLead",
      name: "Редактировать",
    },
  },

  {
    path: "/calculator/:LeadId",
    name: "Calculator",
    component: Calculator,
    meta: {
      layoutClass: "Calculator",
      name: "Рассчет П/У",
    },
  },

  {
    path: "/banks",
    name: "Banks",
    component: Banks,
    meta: {
      layoutClass: "Banks",
      name: "Банки",
    },
  },
  {
    path: "/banks/add",
    name: "AddBank",
    component: AddBank,
    meta: {
      layoutClass: "AddProduct",
      name: "Добавить",
    },
  },
  {
    path: "/banks/:BankId",
    name: "EditBank",
    component: EditBank,
    meta: {
      layoutClass: "EditBank",
      name: "Редактировать",
    },
  },
  {
    path: "/banks/:BankId/product/add",
    name: "AddProduct",
    component: AddProduct,
    meta: {
      layoutClass: "AddProduct",
      name: "Добавить",
    },
  },
  {
    path: "/banks/:BankId/product/:ProductId",
    name: "EditProduct",
    component: EditProduct,
    meta: {
      layoutClass: "EditProduct",
      name: "Редактировать",
    },
  },
];

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute(route, parentLayout = "default") {
  route.meta = route.meta || {};
  route.meta.layout = route.layout || parentLayout;

  if (route.children) {
    route.children = route.children.map((childRoute) =>
      addLayoutToRoute(childRoute, route.meta.layout)
    );
  }
  return route;
}

routes = routes.map((route) => addLayoutToRoute(route));

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: "smooth",
      };
    }
    return {
      x: 0,
      y: 0,
      behavior: "smooth",
    };
  },
});

export default router;
