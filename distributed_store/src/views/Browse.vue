<template>
    <div class="page-category">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered"></h2>
      </div>

      <ProductBox
        v-for="product in Browse.products"
        v-bind:key="product.id"
        v-bind:product="product"
      />
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
      Browse: {
        products: [],
      },
    };
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    async getCategory() {
      //this.$store.commit('setIsLoading', true)
      axios
        .get(`api/v1/products/`)
        .then((response) => {
          this.Browse = response.data;
          document.title =   "Browse | eCommerce";
        })
      //this.$store.commit('setIsLoading', false)
    },
  },
};
</script>
