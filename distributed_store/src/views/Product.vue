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
                    <input
                      type="number"
                      class="input"
                      min="1"
                      v-model="quantity"
                    />
                  </div>
                  <div class="control">
                    <a class="button is-dark" @click="addToCart">To Cart</a>
                  </div>
                </div>
              </div>

              <p class="subtitle" style="float: left">
                Quantity: <b>{{ product.no_of_pieces }}</b>
              </p>
              <p class="subtitle" style="float: right">
                Owned by: <b>{{ product.owner_name }}</b>
              </p>
            </div>
            <footer class="card-footer">
              <p class="card-footer-item">
                <button class="button" v-if="!shared" @click="Share">
                  Share Product
                </button>
              </p>
            </footer>
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
  name: "Product",
  data() {
    return {
      product: {},
      quantity: 1,
      shared: false,
    };
  },
  mounted() {
    this.getProduct();
    this.getshare();
  },
  methods: {
    async getProduct() {
      //this.$store.commit('setIsLoading',true)
      const product_slug = this.$route.params.product_slug;

      axios
        .get(`/api/v1/products/${product_slug}`)
        .then((response) => {
          this.product = response.data;
          console.log(response.data);
          document.title = this.product.name + " | E-Commerce";
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
    getshare() {
      this.shared = this.$route.query.shared;
      console.log(this.$route.query.shared);
    },
    addToCart() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }
      const item = {
        product: this.product,
        quantity: this.quantity,
      };

      // if (this.item.quantity < this.item.product.quantity) {
      this.$store.commit("addToCart", item);

      toast({
        message: "Added to cart",
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: "bottom-right",
      });
      // } else {
      //   toast({
      //     message: "Quantity is not available",
      //     type: "is-danger",
      //     dismissible: true,
      //     pauseOnHover: true,
      //     duration: 2000,
      //     position: "bottom-right",
      //   });
      // }
    },
    Share() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }
      const item = {
        product: this.product.id,
      };

      axios.post("/api/v1/shares/", item).then((response) => {
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
      });
    },
  },
};
</script>
