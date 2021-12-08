<template>
  <div class="page-my-account">
    <div class="column is-multiline">
      <div class="column is-12">
        <h1 class="title">My Store</h1>
      </div>

      <hr />

      <div class="column is-12">
        <h2 class="subtitle">Add New Products:</h2>
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
              <label>Product Name</label>
              <div class="control">
                <input type="text" class="input" v-model="itemName" />
              </div>
            </div>
            <div class="column is-6 field">
              <label>Product Description</label>
              <div class="control">
                <input type="text" class="input" v-model="itemDescription" />
              </div>
            </div>
            <div class="column is-6 field">
              <label>Product Price</label>
              <div class="control">
                <input
                  type="number"
                  class="input"
                  v-model="itemPrice"
                  min="0"
                />
              </div>
            </div>
            <div class="column is-6 field">
              <label>Product Amount</label>
              <div class="control">
                <input
                  type="number"
                  class="input"
                  v-model="itemAmount"
                  min="0"
                />
              </div>
            </div>
            <div class="column is-6 field">
              <label>Public</label>
              <div class="control">
                <input type="radio" value="1" v-model="itemOnSale" />
                <label> Yes</label>
                <br />
                <input type="radio" value="0" v-model="itemOnSale" />
                <label> No</label>
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
        <h2 class="subtitle">My Products</h2>
        <div class="box mb-4">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Category</th>
                <th>Public</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" v-bind:key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.no_of_pieces }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.on_sale }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="column is-12">
        <h2 class="subtitle">Sold Products</h2>
        <div class="box mb-4">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Category</th>
                <th>Public</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in soldProducts" v-bind:key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.no_of_pieces }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.on_sale }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "PersonalStore",
  data() {
    return {
      itemName: "",
      itemPrice: 0,
      itemCategory: 0,
      itemDescription: "",
      itemAmount: 0,
      itemOnSale: 0,
      errorsItem: [],
      errorCat: [],
      categories: [],
      products: [],
      soldProducts: [],
    };
  },
  mounted() {
    document.title = "My Store | E-Commerce";
    this.getCategories();
    this.getProducts();
    this.getSoldProducts();
  },
  methods: {
    submitNewItem() {
      if (this.itemName.length < 3) {
        this.errorsItem.push("Item name must be at least 3 characters long");
      }
      if (this.itemPrice < 1) {
        this.errorsItem.push("Item price must be at least 1");
      }
      if (this.itemCategory === 0) {
        this.errorsItem.push("Item category must be selected");
      }
      if (this.itemDescription.length < 5) {
        this.errorsItem.push(
          "Item description must be at least 5 characters long"
        );
      }
      if (this.itemAmount < 1) {
        this.errorsItem.push("Item amount must be at least 1");
      }
      if (this.errorsItem.length == 0) {
        axios
          .post(`/api/v1/products/`, {
            name: this.itemName,
            price: this.itemPrice,
            category: this.itemCategory,
            description: this.itemDescription,
            no_of_pieces: this.itemAmount,
            on_sale: this.itemOnSale,
          })
          .then((response) => {
            console.log(this.itemOnSale);
            console.log(response.data);
            toast({
              message: "Successfully added!",
              type: "is-success",
              duration: 5000,
              position: "top-center",
              dissmissable: true,
              pauseOnHover: true,
            });
            this.getProducts();
            this.itemName = "";
            this.itemPrice = 0;
            this.itemCategory = 0;
            this.itemDescription = "";
            this.itemAmount = 0;
            this.itemOnSale = 0;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getCategories() {
      axios
        .get(`/api/v1/latest-categories`)
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProducts() {
      axios
        .get(`/api/v1/products/`)
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
        getSoldProducts() {
      axios
        .get(`/api/v1/soldProducts/`)
        .then((response) => {
          this.soldProducts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
