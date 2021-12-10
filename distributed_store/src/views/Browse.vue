<template>
  <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered"></h2>
      </div>

      <div
        class="column is-3"
        v-for="product in products"
        v-bind:key="product.id"
      >
        <div class="box" v-if="product.on_sale && product.no_of_pieces != 0">
          <figure class="image mb-4">
            <img v-bind:src="product.image_thumbnail" />
          </figure>
          <h3 class="is-size-4">{{ product.name }}</h3>
          <h3 class="is-size-4">Price</h3>
          <p class="is-size-6 has-text-grey">${{ product.price }}</p>
          <h3 class="is-size-4">Sold By</h3>
          <p class="is-size-6 has-text-grey">{{ product.owner_name }}</p>
          <h3 class="is-size-4">Quantity</h3>
          <p class="is-size-6 has-text-grey">{{ product.no_of_pieces }}</p>
          <router-link v-bind:to="product.url" class="button is-dark mt-4">
            View
          </router-link>
        </div>
      </div>
    </div>
    <h1 class="title">shared items</h1>
    <div
      class="column is-3"
      v-for="share in shares"
      v-bind:key="share.product.id"
    >
      <div class="box" v-if="share.product.on_sale">
        <figure class="image mb-4">
          <img v-bind:src="share.product.image_thumbnail" />
        </figure>
        <h3 class="is-size-4">{{ share.product.name }}</h3>
        <h3 class="is-size-4">Price</h3>
        <p class="is-size-6 has-text-grey">${{ share.product.price }}</p>
        <h3 class="is-size-4">Sold By</h3>
        <p class="is-size-6 has-text-grey">{{ share.share_holder_name }}</p>
        <h3 class="is-size-4">Quantity</h3>
        <p class="is-size-6 has-text-grey">{{ share.product.no_of_pieces }}</p>
        <router-link v-bind:to="share.url" class="button is-dark mt-4">
          View
        </router-link>
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
      axios.get(`api/v1/shares/shop/`).then((response) => {
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
