<template>
  <div class="page-search">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Search</h1>

        <div class="field has-addons">
          <div class="control">
            <input
              type="text"
              class="input"
              placeholder="What are you looking for?"
              v-model="query"
              @change="performSearch()"
            />
          </div>
          <div class="control">
            <button class="button is-success" @click="search">
              <span class="material-icons"> search </span>
            </button>
          </div>
        </div>
        <h2 class="is-size-5 has-text-grey">Search term: "{{ query }}"</h2>
      </div>

      <div class="column is-12" v-if="products.length > 0">
        <ProductBox
          v-for="product in products"
          v-bind:key="product.id"
          v-bind:product="product"
        />
      </div>
      <div v-else>
        <div class="column is-12">
          <p class="has-text-grey">No results found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductBox from "../components/ProductBox.vue";
import { toast } from "bulma-toast";

export default {
  name: "Search",
  components: {
    ProductBox,
  },
  data() {
    return {
      products: [],
      query: "",
    };
  },
  mounted() {
    document.title = "Search | E-Commerce";
    if (this.$route.query["query"]) {
      this.query = this.$route.query["query"];
      this.performSearch();
    }
  },
  methods: {
    performSearch() {
      axios
        .post("/api/v1/products/search/", { query: this.query })
        .then((response) => {
          this.products = response.data;
          for (let i = 0; i < this.products.length; i++) {
            this.products[i].url = `/products/${this.products[i].id}/`;
          }
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
