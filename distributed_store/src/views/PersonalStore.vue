<template>
  <div class="page-my-account">
    <div class="column is-multiline">
      <div class="column is-12">
        <h1 class="title">My Store</h1>
      </div>

      <hr />

      <div class="column is-12">
        <h2 class="subtitle">Add New Category:</h2>
        <div class="box mb-4">
          <form @submit.prevent="submitNewCategory">
            <div class="column is-6 field">
              <label>Category Name</label>
              <div class="control">
                <input type="text" class="input" v-model="categoryName" />
              </div>
            </div>
            <div class="notification is-danger" v-if="errorCat.length">
              <p v-for="error in errorCat" v-bind:key="error">{{ error }}</p>
            </div>
            <div class="column is-4 field">
              <div class="control">
                <button class="button is-dark">Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="column is-12">
        <h2 class="subtitle">Add New Items:</h2>
        <div class="box mb-4">
          <form @submit.prevent="submitNewItem">
            <div class="column is-6 field">
              <label>Category</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="itemCategory" required>
                    <option value="" disabled>Select Category</option>
                    <option
                      v-for="category in categories"
                      :value="category.id"
                      v-bind:key="category.id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="column is-6 field">
              <label>Item Name</label>
              <div class="control">
                <input type="text" class="input" v-model="itemName" />
              </div>
            </div>
            <div class="column is-6 field">
              <label>Item Price</label>
              <div class="control">
                <input
                  type="number"
                  class="input"
                  v-model="itemPrice"
                  min="0"
                />
              </div>
            </div>
            <div class="notification is-danger" v-if="errorsItem.length">
              <p v-for="error in errorsItem" v-bind:key="error">{{ error }}</p>
            </div>
            <div class="column is-6 field">
              <div class="control">
                <button class="button is-dark">Add</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr />

      <div class="column is-12">
        <h2 class="subtitle">My Items</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PersonalStore",
  data() {
    return {
      itemName: "",
      itemPrice: 0,
      itemCategory: "",
      errorsItem: [],
      errorCat: [],
      categories: [],
      categoryName: "",
    };
  },
  mounted() {
    document.title = "My Store | E-Commerce";
    this.getCategories();
  },
  methods: {
    submitNewItem() {
      if (this.itemName.length < 3) {
        this.errorsItem.push("Item name must be at least 3 characters long");
      }
      if (this.itemPrice < 1) {
        this.errorsItem.push("Item price must be at least 1");
      }
      if (this.itemCategory == "") {
        this.errorsItem.push("Item category must be selected");
      }
      if (this.errorsItem.length == 0) {
        axios
          .get(`/api/v1/products`)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    submitNewCategory() {
      if (this.categoryName.length > 0) {
        axios
          .post(`/api/v1/categories`, {
            name: this.categoryName,
          })
          .then((response) => {
            console.log(response.data);
            this.getCategories();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.errorCat.push("Category name is required");
      }
    },
    getCategories() {
      axios
        .get(`/api/v1/categories`)
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // getProduct() {
    //   const category_slug = this.$route.params.category_slug;
    //   const product_slug = this.$route.params.product_slug;
    //   console.log(category_slug);
    //   console.log(product_slug);

    //   axios
    //     .get(`/api/v1/products/${product_slug}`)
    //     .then((response) => {
    //       this.product = response.data;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
  },
};
</script>
