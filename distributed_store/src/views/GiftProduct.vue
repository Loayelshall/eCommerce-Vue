<template>
  <div class="page-product">
    <section class="hero is-halfheight">
      <div class="hero-body">
        <div class="container is-8 mt-5">
          <div class="card">
            <div class="card-content">
              <p class="title m-4">
                {{ product.name }}
              </p>
              <p class="subtitle is-size-4 m-5">
                {{ product.description }}
              </p>
              <div class="has-text-centered">
                <h2 class="title">${{ product.price }}</h2>
              </div>
              <div class="card-footer-item">
                <div class="field has-addons mt-6">
                  <div class="control">
                    <label for="">Quantity</label>
                    <input
                      type="number"
                      class="input"
                      min="1"
                      disabled
                      v-model="quantity"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "GiftProduct",
  data() {
    return {
      product: {},
      quantity: 1,
      shared: false,
    };
  },
  mounted() {
    this.getProduct();
    document.title = "Gift Details | E-Commerce";
  },
  methods: {
    async getProduct() {
      //this.$store.commit('setIsLoading',true)
      const product_slug = this.$route.params.product_slug;
      const gift_slug = this.$route.params.gift_slug;

      axios
        .get(`/api/v1/gifts/${gift_slug}`)
        .then((response) => {
          this.quantity = response.data.order.amount;
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(`/api/v1/products/${product_slug}`)
        .then((response) => {
          this.product = response.data;
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
