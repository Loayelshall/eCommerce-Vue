<template>
  <div class="container-fluid" id="wrapper">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <strong>eCommerce</strong>
        </a>

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="showMobileMenu = !showMobileMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        class="navbar-menu"
        id="navbar-menu"
        v-bind:class="{ 'is-active': showMobileMenu }"
      >
        <div class="navbar-start">
          <div class="navbar-item">
            <!-- <form> -->
            <div class="field has-addons" v-if="this.$route.name !== 'Search'">
              <div class="control">
                <input
                  type="text"
                  class="input"
                  placeholder="What are you looking for?"
                  v-model="query"
                />
              </div>
              <div class="control">
                <button class="button is-success" @click="search">
                  <span class="material-icons"> search </span>
                </button>
              </div>
            </div>
            <!-- </form> -->
          </div>
          <div class="navbar-start">
            <template v-if="$store.state.isAuthenticated">
              <a class="navbar-item" href="/browse"> Browse </a>
              <router-link to="/personalStore" class="navbar-item">
                My Store
              </router-link>
              <router-link to="/gift" class="navbar-item"> Gift </router-link>
              <a class="navbar-item" href="/report"> Report </a>
            </template>

            <!-- <a class="navbar-item" href="/about"> About </a> -->
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <template v-if="$store.state.isAuthenticated">
                <router-link to="/account" class="button is-dark">
                  My Account
                </router-link>
                <form @submit="logout">
                  <button class="button is-light">Logout</button>
                </form>
                <router-link to="/cart" class="button is-success ml-2">
                  <span>Cart ({{ cartTotalLength }}) </span>
                </router-link>
              </template>
              <template v-else>
                <a class="button is-primary" href="/register">
                  <strong>Register</strong>
                </a>
                <a class="button is-light" href="/login">Login</a>
              </template>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading':$store.state.isLoading}">
      <div class="lds-dual-ring"></div>
    </div> -->

    <section class="">
      <router-view />
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2021</p>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showMobileMenu: false,
      cart: {
        items: [],
        query: "",
      },
    };
  },
  beforeCreate() {
    this.$store.commit("initializeStore");
    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
  mounted() {
    this.cart = this.$store.state.cart;
  },
  methods: {
    search() {
      this.$router.push({
        name: "Search",
        component: "Search",
        query: {
          query: this.query,
        },
      });
    },
    logout() {
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");
      this.$store.commit("clearCart");
    },
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0;
      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
      }
      return totalLength;
    },
  },
};
</script>

<style lang="scss">
@import "../node_modules/bulma";
@import "../node_modules/material-icons/iconfont/material-icons.css";
@import "../node_modules/vue-material/dist/vue-material.min.css";
</style>

// get(api/v1/orders/)
