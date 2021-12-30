<template>
  <div class="container">
    <div class="md-layout">
      <div class="md-layout-item m-5">
        <div class="brand m-5 has-text-centered">
          <h1 class="title">Products</h1>
        </div>
      </div>
    </div>
    <div class="columns is-multiline has-text-centered">
      <div class="tile is-parent" style="flex-wrap: wrap">
        <div v-for="product in products" v-bind:key="product.id">
          <div class="" v-if="product.on_sale && product.no_of_pieces != 0">
            <div class="tile is-12 is-vertical is-parent" style="width: 445px">
              <div class="tile is-child box">
                <h4 class="is-size-4">{{ product.name }}</h4>
                <div class="has-text-centered m-4">
                  <h1 class="title m-4">${{ product.price }}</h1>
                </div>
                <div class="m-1">
                  <p
                    class="is-size-6 has-text-grey is-right"
                    style="float: left"
                  >
                    Owner: {{ product.owner_name }}
                  </p>
                  <p
                    class="is-size-6 has-text-grey is-right"
                    style="float: right"
                  >
                    Quantity: {{ product.no_of_pieces }}
                  </p>
                </div>
                <br />
                <div class="has-text-centered">
                  <router-link
                    v-bind:to="product.url"
                    class="button is-dark mt-4"
                  >
                    View
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="md-layout">
      <div class="md-layout-item m-5">
        <div class="brand has-text-centered">
          <h1 class="title">Shared Products</h1>
        </div>
      </div>
    </div>
    <div class="tile is-parent" style="flex-wrap: wrap">
      <div class="" v-for="share in shares" v-bind:key="share.product.id">
        <div
          class=""
          v-if="share.product.on_sale && share.product.no_of_pieces != 0"
        >
          <div class="tile is-12 is-vertical is-parent" style="width: 445px">
            <div class="tile is-child box">
              <h4 class="is-size-4">{{ share.product.name }}</h4>
              <div class="has-text-centered m-4">
                <h1 class="title m-4">${{ share.product.price }}</h1>
              </div>
              <div class="m-1">
                <p class="is-size-6 has-text-grey is-right" style="float: left">
                  Owner: {{ share.product.owner_name }}
                </p>
                <p
                  class="is-size-6 has-text-grey is-right"
                  style="float: right"
                >
                  Quantity: {{ share.product.no_of_pieces }}
                </p>
              </div>
              <br />
              <div class="has-text-centered">
                <router-link v-bind:to="share.url" class="button is-dark mt-4">
                  View
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductBox from "../components/ProductBox.vue";

export default {
  name: "Browse",
  compnents: {
    ProductBox,
  },
  data() {
    return {
      products: [],
      shares: [],
    };
  },
  mounted() {
    this.getCategory();
    this.getShared();
    document.title = "Browse | eCommerce";
  },
  methods: {
    getCategory() {
      //this.$store.commit('setIsLoading', true)
      axios.get(`api/v1/products/shop/`).then((response) => {
        this.products = response.data;
        for (let i = 0; i < this.products.length; i++) {
          this.products[i].url = `/products/${this.products[i].id}/`;
        }
      });

      //this.$store.commit('setIsLoading', false)
    },
    getShared() {
      axios.get(`api/v1/shares/`).then((response) => {
        this.shares = response.data;
        console.log(response.data);
        for (let i = 0; i < this.shares.length; i++) {
          this.shares[
            i
          ].url = `/products/${this.shares[i].product.id}/?shared=yes`;
        }
      });
      // .catch(error=>{

      // });
    },
  },
};
</script>
