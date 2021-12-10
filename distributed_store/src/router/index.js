import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import Product from "../views/Product.vue";
import Category from "../views/Category";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Account from "../views/Account.vue";
import Checkout from "../views/Checkout.vue";
import Search from "../views/Search";
import Cart from "../views/Cart.vue";
import Browse from "../views/Browse.vue";
import PersonalStore from "../views/PersonalStore.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/Cart/checkout",
    name: "Checkout",
    component: Checkout,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/personalStore",
    name: "PersonalStore",
    component: PersonalStore,
    meta: {
      requireLogin: true,
    },
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
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/browse",
    name: "Browse",
    component: Browse,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/products/:product_slug",
    name: "Product",
    component: Product,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: "/:category_slug",
    name: "Category",
    component: Category,
    meta: {
      requireLogin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requireLogin) &&
    !store.state.isAuthenticated
  ) {
    next({ name: "Login", query: { to: to.path } });
  } else {
    next();
  }
});

export default router;
