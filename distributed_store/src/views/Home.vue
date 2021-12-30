<template>
  <div class="home">
    <section class="hero is-medium is-light mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">Welcome to eCommerce</p>
        <p class="subtitle">Lorem ipsum dolor sit amet.</p>
      </div>
    </section>

    <div class="columns is-multiline mt-3 m-5">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest products</h2>
      </div>

      <ProductBox
        v-for="product in latestProducts"
        v-bind:key="product.id"
        v-bind:product="product"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
import ProductBox from "../components/ProductBox.vue";

export default {
  name: "Home",
  data() {
    return {
      latestProducts: [],
    };
  },
  components: {
    ProductBox,
  },
  mounted() {
    if (this.$store.state.isAuthenticated) {
      this.getBrowse();
    } else {
      this.getLatestProducts();
    }

    document.title = "Home | E-Commerce";
  },
  methods: {
    async getLatestProducts() {
      //this.$store.commit('setLoading',true)
      await axios
        .get("/api/v1/latest-products/")
        .then((response) => {
          this.latestProducts = response.data;
          for (let i = 0; i < this.latestProducts.length; i++) {
            this.latestProducts[
              i
            ].url = `/products/${this.latestProducts[i].id}/`;
          }
          this.latestProducts.splice(5, this.latestProducts.length - 6);
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
          toast({
            message: `${error.response.data}`,
            type: "is-danger",
            duration: 5000,
            position: "top-center",
            dissmissable: true,
            pauseOnHover: true,
          });
        });
      //this.$store.commit('setLoading',false)
    },
    getBrowse() {
      axios
        .get("/api/v1/products/shop/")
        .then((response) => {
          this.latestProducts = response.data;
          for (let i = 0; i < this.latestProducts.length; i++) {
            this.latestProducts[
              i
            ].url = `/products/${this.latestProducts[i].id}/`;
          }
          this.latestProducts.splice(5, this.latestProducts.length - 6);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          toast({
            message: `${error.response.data}`,
            type: "is-danger",
            duration: 5000,
            position: "top-center",
            dissmissable: true,
            pauseOnHover: true,
          });
        });
    },
  },
};
</script>
