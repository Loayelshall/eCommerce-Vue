<template>
  <div class="page-product">
    <section class="section is-small">
    <div class="columns is-9">
      <div class="columns is-6">
      <figure class="image mb-6">
        <img v-bind:src="product.image_main" />
      </figure>
      </div>
      <h1 class="title">{{ product.name }}</h1>
    </div>
    <div class="column is-3">
      <h2 class="subtitle">{{ product.description }}</h2>
      <p><strong>Price:</strong>${{ product.price }}</p>
      <div class="field has-addons mt-6">
        <div class="control">
          <input type="number" class="input" min="1" v-model="quantity" />
        </div>
        <div class="control">

          <a class="button is-dark" @click="addToCart">To Cart</a>

        </div>
      </div>
    </div>
    </section>
              <div class="has-text-centered">
    <button class="is-large button" @click="Share"> Share </button>
              </div>
  </div>
</template>



<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "Product",
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      //this.$store.commit('setIsLoading',true)
      const product_slug = this.$route.params.product_slug;

      axios
        .get(`/api/v1/products/${product_slug}`)
        .then((response) => {
          this.product = response.data;
          document.title = this.product.name + " | E-Commerce";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addToCart() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }
      const item = {
        product: this.product,
        quantity: this.quantity,
      };
      this.$store.commit("addToCart", item);

      toast({
        message: "Added to cart",
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: "bottom-right",
      });
    },
    Share(){
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }
      const item = {
        product: this.product.id,
      };

      axios
      .post("/api/v1/shares/", item)
      .then((response) => {
          console.log(response);
          this.$router.push("/");
      toast({
        message: "Shared",
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: "bottom-right",
      });
      })
    },
  },
};
</script>
