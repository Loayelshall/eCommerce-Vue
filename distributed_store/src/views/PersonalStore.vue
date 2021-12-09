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
          <form enctype="multipart/form-data" @submit.prevent="submitNewItem">
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

            <!-- <div class="column is-6 field">
              <div class="control">
                <div class="file is-info has-name">
                  <label class="file-label">
                    <input
                      accept="image/*"
                      id="photo"
                      class="file-input"
                      type="file"
                      @change="changeName('photo')"
                    />
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label"> Upload Photo </span>
                    </span>
                    <span class="file-name">
                      <label id="photolabel">Upload</label>
                    </span>
                  </label>
                </div>
              </div>
              <br />
              <div class="control">
                <div class="file is-info has-name">
                  <label class="file-label">
                    <input
                      accept="image/*"
                      id="Thumbnail"
                      class="file-input"
                      type="file"
                      @change="changeName('Thumbnail')"
                    />
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label"> Upload Thumbnail </span>
                    </span>
                    <span class="file-name">
                      <label id="Thumbnaillabel">Upload</label>
                    </span>
                  </label>
                </div>
              </div>
            </div> -->

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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" v-bind:key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.no_of_pieces }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.category_name }}</td>
                <td>{{ product.on_sale }}</td>
                <td>
                  <div class="field has-addons">
                    <p class="control">
                      <button
                        class="button is-dark"
                        @click="displayModal(product.id, 1, product)"
                      >
                        Edit
                      </button>
                    </p>
                    <p class="control">
                      <button
                        class="button is-danger"
                        @click="deleteProduct(product.id)"
                      >
                        Delete
                      </button>
                    </p>
                  </div>
                  <div :id="product.id" class="modal">
                    <div
                      class="modal-background"
                      @click="displayModal(product.id, 0, '')"
                    ></div>
                    <div class="modal-content">
                      <div class="box">
                        <h4 class="title">Edit Product</h4>
                        <form
                          enctype="multipart/form-data"
                          @submit.prevent="editItem"
                        >
                          <div class="column is-6 field">
                            <label>Category</label>
                            <div class="control">
                              <div class="select is-fullwidth">
                                <select v-model="editedItemCategory" required>
                                  <option value="" disabled>
                                    Select Category
                                  </option>
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
                              <input
                                type="text"
                                class="input"
                                v-model="editedItemName"
                              />
                            </div>
                          </div>
                          <div class="column is-6 field">
                            <label>Product Description</label>
                            <div class="control">
                              <input
                                type="text"
                                class="input"
                                v-model="editedItemDescription"
                              />
                            </div>
                          </div>
                          <div class="column is-6 field">
                            <label>Product Price</label>
                            <div class="control">
                              <input
                                type="number"
                                class="input"
                                v-model="editedItemPrice"
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
                                v-model="editedItemAmount"
                                min="0"
                              />
                            </div>
                          </div>
                          <div class="column is-6 field">
                            <label>Public</label>
                            <div class="control">
                              <input
                                type="radio"
                                value="1"
                                v-model="editedItemOnSale"
                              />
                              <label> Yes</label>
                              <br />
                              <input
                                type="radio"
                                value="0"
                                v-model="editedItemOnSale"
                              />
                              <label> No</label>
                            </div>
                          </div>
                          <div
                            class="notification is-danger"
                            v-if="editedErrorsItem.length"
                          >
                            <p
                              v-for="error in editedErrorsItem"
                              v-bind:key="error"
                            >
                              {{ error }}
                            </p>
                          </div>
                          <div class="column is-6 field">
                            <div class="control">
                              <button class="button is-dark">Add</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="column is-12">
        <h2 class="subtitle">Sold Products</h2>
        <div class="box mb-4">
          <div class="table-container">
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

      <div class="column is-12">
        <h2 class="subtitle">Shared Products</h2>
        <div class="box mb-4">
          <div class="table-container">
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
                <tr v-for="product in sharedProducts" v-bind:key="product.id">
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
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "PersonalStore",
  data() {
    return {
      editedItemName: "",
      editedItemPrice: 0,
      editedItemCategory: 0,
      editedItemDescription: "",
      editedItemAmount: 0,
      editedItemOnSale: 0,
      editedErrorsItem: [],
      editingId: 0,
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
      sharedProducts:[],
    };
  },
  mounted() {
    document.title = "My Store | E-Commerce";
    this.getCategories();
    this.getProducts();
    this.getSoldProducts();
    this.getSharedProducts();
  },
  methods: {
    submitNewItem() {
      this.errorsItem = [];
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
            image_main: "http://127.0.0.1:8000/media/uploads/download.jpg",
            image_thumbnail: "http://127.0.0.1:8000/media/uploads/download.jpg",
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
    editItem() {
      this.editedErrorsItem = [];
      if (this.editedItemName.length < 3) {
        this.editedErrorsItem.push(
          "Item name must be at least 3 characters long"
        );
      }
      if (this.editedItemPrice < 1) {
        this.editedErrorsItem.push("Item price must be at least 1");
      }
      if (this.editedItemCategory === 0) {
        this.editedErrorsItem.push("Item category must be selected");
      }
      if (this.editedItemDescription.length < 5) {
        this.editedErrorsItem.push(
          "Item description must be at least 5 characters long"
        );
      }
      if (this.editedItemAmount < 1) {
        this.editedErrorsItem.push("Item amount must be at least 1");
      }
      if (this.editedErrorsItem.length == 0) {
        axios
          .post(`/api/v1/products/`, {
            name: this.editedItemName,
            price: this.editedItemPrice,
            category: this.editedItemCategory,
            description: this.editedItemDescription,
            no_of_pieces: this.editedItemAmount,
            on_sale: this.editedItemOnSale,
            image_main: "http://127.0.0.1:8000/media/uploads/download.jpg",
            image_thumbnail: "http://127.0.0.1:8000/media/uploads/download.jpg",
          })
          .then((response) => {
            console.log(response.data);
            toast({
              message: "Successfully Edited!",
              type: "is-success",
              duration: 5000,
              position: "top-center",
              dissmissable: true,
              pauseOnHover: true,
            });
            this.displayModal(this.editingId, 0, "");
            this.getProducts();
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
    getSharedProducts() {
      axios
        .get(`/api/v1/shares/`)
        .then((response) => {
          this.sharedProducts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeName(id) {
      let x = document.getElementById(id).value;
      let y = x.split("\\")[2];
      document.getElementById(id + "label").innerHTML = y;
    },
    deleteProduct(id) {
      console.log(id);
      axios
        .delete(`/api/v1/products/`, {
          product_id: id,
        })
        .then((response) => {
          console.log(response);
          this.getProducts();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    displayModal(id, toggle, product) {
      this.editedErrorsItem = [];
      if (toggle) {
        document.getElementById(id).classList.add("is-active");
        this.editedItemName = product.name;
        this.editedItemPrice = product.price;
        this.editedItemCategory = product.category;
        this.editedItemDescription = product.description;
        this.editedItemAmount = product.no_of_pieces;
        this.editedItemOnSale = product.on_sale;
        this.editingId = id;
      } else {
        document.getElementById(id).classList.remove("is-active");
      }
    },
  },
};
</script>
