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
        <div class="box" v-if="product.on_sale">
          <figure class="image mb-4">
            <img v-bind:src="product.image_thumbnail" />
          </figure>
          <h3 class="is-size-4">{{ product.name }}</h3>
          <p class="is-size-6 has-text-grey">${{ product.price }}</p>
          <router-link v-bind:to="product.url" class="button is-dark mt-4">
            View
          </router-link>
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
    };
  },
  mounted() {
    this.getCategory();
    document.title = "Browse | eCommerce";
  },
  methods: {
    async getCategory() {
      //this.$store.commit('setIsLoading', true)
      axios.get(`api/v1/products/shop`).then((response) => {
        this.products = response.data;
        for (let i = 0; i < this.products.length; i++) {
          this.products[i].url = `/products/${this.products[i].id}/`;
        }
      });
      //this.$store.commit('setIsLoading', false)
    },
  },
};
</script>
